import React from 'react'
import { register } from "../../../services/userService";
import Joi from 'joi-browser';
import { toast } from "react-toastify";
import Forms from 'components/Common/form';


import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  FormGroup,
  Button,
  Form,
  Input,
  Col,
  UncontrolledTooltip,
} from "reactstrap";


class AddNewEmp extends Forms {
  state = {
    data: {
      EmployeeName: "",
      joiningDate: "",
      Phone: "",
      Email: "",
      Role: "",
      DateOfBirth: "",
      NetSalary: "",
      AgreementYears: "",
    },
    loadstatus: false,
    errors: [],
    roles: [],
    maxdate: '',
    today: '',
    mindate: '',
  };



  schema = {

    EmployeeName: Joi.string()
      .min(5)
      .max(50)
      .required().label(
        `"a" should be a type of 'text '`,
      ),
    joiningDate: Joi.date().required(),
    Phone: Joi.string()
      .length(10)
      .regex(/^[6-9]{1}[0-9]{9}$/)
      .required(),
    Email: Joi.string().email().required(),
    Role: Joi.string()
      .min(3)
      .max(50)
      .required(),
    DateOfBirth: Joi.string().required(),
    NetSalary: Joi.number().required(),
    AgreementYears: Joi.number().required(),
  };

  async componentDidMount() {
    let date = new Date();
    let d1 = new Date(date.getFullYear() - 18, date.getMonth(), date.getDate());
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
    var dd2 = d2.getDate();
    var mm2 = d2.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyy2 = d2.getFullYear();
    if (dd2 < 10) {
      dd2 = '0' + dd
    }
    if (mm2 < 10) {
      mm2 = '0' + mm
    }

    var min = yyyy + '-' + mm + '-' + dd;
    var today = yyyy2 + '-' + mm2 + '-' + dd2;
    await this.setState({ maxdate: min, today })
    console.log(this.state)
  }

  doSubmit = async () => {

    const { EmployeeName } = this.state.data
    await this.setState({ loadstatus: true })
    try {
      const { data } = this.state;
      var newItem = Object.assign(data, { EmployeeName: data.EmployeeName.toLowerCase(), Role: data.Role.toLowerCase() });
      await register(newItem);
      toast.success("Employee Added");
      setTimeout(() => {
        window.location = state ? state.from.pathname : "/dashboard";
      }, 2000);
      const { state } = this.props.location;
      // await get_employeelist();
    } catch (ex) {
      await this.setState({ loadstatus: true })
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.AgreementYears = ex.response.data.data;
        await this.setState({ errors });
        setTimeout(async () => {
          await this.setState({ loadstatus: false })
        }, 2000);

      }
    }

    // this.props.history.push("/admin/addemployee");
  };
  render() {
    const { loadstatus, maxdate, mindate, today } = this.state

    return (
      <Container className="mt-7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow border-0">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Add New emp</h3>
              </CardHeader>
              <CardBody className="px-lg-4 py-sm-5">
                <Form role="form" onSubmit={this.handleSubmit}>
                  <Row>
                    <Col lg="6">
                      {this.renderInput("joiningDate", "Joining Date", "date", today)}
                    </Col>

                    <Col lg="6">
                      {this.renderInput("EmployeeName", "Employee Name")}
                    </Col>
                  </Row>

                  <Row>
                    <Col lg="6">
                      {this.renderInput("Phone", "Phone")}
                    </Col>

                    <Col lg="6">
                      {this.renderInput("Email", "Email ID")}
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      {this.renderInput("Role", "Designation")}
                    </Col>

                    <Col lg="6">
                      {this.renderInput("DateOfBirth", "Date Of Birth", "date", maxdate,)}
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      {this.renderInput("NetSalary", "Net Salary")}
                    </Col>

                    <Col lg="6">
                      {this.renderInput("AgreementYears", "Agreement Years", 'number', '3', '0')}
                    </Col>
                  </Row>
                  <Col className="text-right" xs="4" >
                    <Button disabled={loadstatus}
                      className="float-right , text-center"
                      color="default"
                    >
                      Add
                    </Button>
                  </Col>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    )

  }

}

export default AddNewEmp;

