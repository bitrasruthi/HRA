import React from "react";
import { connect } from "react-redux";
import Forms from "../../Common/form";
import { toast } from "react-toastify";
import Joi from 'joi-browser';


import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import get_employeelist from '../Terminate Emp/terminateEmp';
import { terminateEmp } from '../../../services/terminateService';

class DeleteEmp extends Forms {
  state = {
    data: {
      Reason: '',
      AgreementDone: '',
    },
    leaveid: {},
    errors: [],
    employees: [],
    disabled: false,
    showPopup: true
  };

  schema = {
    // EmployeeId: Joi.string().required(),
    Reason: Joi.string().min(5).required(),
    AgreementDone: Joi.string().required(),
  };

  doSubmit = async (emp) => {
    this.setState({ disabled: true })
    try {
      // const id = this.props.match.params.id
      console.log(this.props.leaveid);

      const data = { ...this.state.data, EmployeeId: this.props.leaveid }
      await this.setState({ data })
      const pp = await terminateEmp(data);
      await this.setState({ data: pp });
      toast.success('Employee Terminated Successfully')
      window.location = "/admin/index";


    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        toast('somthing worng')
        errors.EmployeeId = ex.response.data.data;
        this.setState({ errors });
      }
    }
  };



  async componentDidMount() {
    if (!this.props.getemployeelist) {
      await get_employeelist();
    }
    const dd = await this.props.getemployeelist;
    // console.log(dd);
    await this.setState({ employees: dd });
    // await this.setState({ isLoading: false });
  }


  render() {
    const { leave } = this.state;
    return (


      <div className=" pt-4" >
          <Card className="bg-secondary shadow border-0" >
            <CardHeader className="bg-gradient-teal border-0">
              <Col xs="9">
                <h3 className=" ml-4 text-center">Termination</h3>
              </Col>
            </CardHeader>
            <CardBody className="px-lg-3 py-sm-5">
              <Form role="form" onSubmit={this.handleSubmit}>
                {/* {this.renderInput("EmployeeId", "Employee Id",)} */}
                {this.renderInput("Reason", "Reason",)}
                {/* <input type="radio" name="option" id="1" value="Yes" />
                      <input type="radio" name="option" id="2" value="No" /> */}
                {this.renderInput("AgreementDone", "Agreement Period Completed?",)}
                <div className="text-center " >
                  <Button className='bg-teal border-0'disabled={this.state.disabled} variant="contained" onClick={this.handleSubmit}>
                    Terminate
                  </Button>

                </div>

              </Form>
            </CardBody>

          </Card>
        <div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    getemployeelist: state.getemployeelist,
  };
};

export default connect(mapStateToProps)(DeleteEmp);

