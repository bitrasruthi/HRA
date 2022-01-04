import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";

import Joi from "joi-browser";
import { applyLeave } from "services/leaveService";

import Forms from "../../Common/form";
import {
  Button,
  Card,
  Label,
  CardHeader,
  Input,
  CardBody,
  Col,
  Container, Row,
  Form,
} from "reactstrap";

class LeaveForm extends Forms {
  state = {
    data: {
      from_Date: "",
      to_Date: "",
      subject: "",
      reason: "",
      leave_type: "",
      To: "",
    },
    maxdate: '',
    mindate: '',
    loadstatus: false,
    errors: [],
    today: '',
    options: [{ select: '' }, { CasualLeave: 'Casual Leave' }, { Sickleave: 'Sick Leave' }],
    To: [{ select: '' }, { Admin: 'Admin' }],
  };

  handleChange(event) { this.setState({ value: event.target.options }); }

  doSubmit = async () => {
    await this.setState({ loadstatus: true })
    try {
      const { data } = this.state;
      const dd = await applyLeave(data);
      console.log(dd);

      toast.success(dd.data);
      setTimeout(() => {
        window.location = state ? state.from.pathname : "/eleavelist";
      }, 2000);
      await this.setState({ loadstatus: true })
      const { state } = this.props.location;
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.from_Date = ex.response.data.data;
        this.setState({ errors });
      }
    }
  };
  async componentDidMount() {
    let date = new Date();
    let d1 = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 20);
    let d2 = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    var dd = d1.getDate();
    var mm = d1.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyy = d1.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }

    var min = yyyy + '-' + mm + '-' + dd;
    var dd2 = d2.getDate();
    var mm2 = d2.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyy2 = d2.getFullYear();
    if (dd2 < 10) {
      dd2 = '0' + dd
    }
    if (mm2 < 10) {
      mm2 = '0' + mm
    }

    var min2 = yyyy2 + '-' + mm2 + '-' + dd2;
    await this.setState({ maxdate: min, today: min2 })

  }


  schema = {
    from_Date: Joi.date().required(),
    to_Date: Joi.date().required(),
    subject: Joi.string().min(5).required(),
    reason: Joi.string().min(5).required(),
    leave_type: Joi.string().required(),
    To: Joi.string().required(),
  };

  render() {
    const { options, To, maxdate, today } = this.state;
    const { from_Date } = this.state.data
    return (
      <>
        <Container className="" fluid>
          {/* Table */}
          <Row>
            <div className="col ">
              <Card className="mt-8 shadow">
                <CardHeader className="bg-gradient-orange text-center">
                  <h3 className="mb-0">Leave Form</h3>
                </CardHeader>
                <CardBody className="px-lg-3 py-sm-5">
                  <Form role="form" onSubmit={this.handleSubmit}>
                    <Row>
                      <Col lg='6'>
                        {this.renderInput("from_Date", "From Date", "date", maxdate, today)}
                      </Col>

                      <Col lg='6'>
                        {this.renderInput("to_Date", "To Date", "date", maxdate, from_Date)}
                      </Col>
                    </Row>
                    <Row>
                      <Col lg='6'>
                        {this.renderDropdown("leave_type", "Leave Type", options)}
                      </Col>

                      <Col lg='6'>
                        {this.renderDropdown("To", "To", To)}
                      </Col>
                    </Row>
                    <Row>

                      <Col >
                        {this.renderInput("subject", "Subject:")}
                      </Col>
                    </Row>
                    <Row>
                      <Col >
                        {this.renderInput("reason", "Reason")}
                      </Col>
                    </Row>



                    {/* {this.renderButton("Submit")}
                 */}
                    <div style={{ textAlign: 'center' }}>
                      <Button disabled={this.state.loadstatus} style={{ marginLeft: '0px', marginTop: '0px', background: '#B665E0', color: 'white', border: 'none' }} variant="contained" onClick={this.onApprove}>
                        Submit
                      </Button>

                    </div>

                  </Form>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default LeaveForm;
