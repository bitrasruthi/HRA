import  Forms  from 'components/Common/form';
import React from 'react';
import auth from '../../services/authService'
import Joi from "joi-browser";
import { toast } from 'react-toastify';


import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

class Login extends Forms {
  state = {  data: {Email: "", Password: ""} , errors: {} , loadstatus:false };
  schema = {
    Email: Joi.string().required().email(),
    Password: Joi.string().min(5).required(),
  };
   
  doSubmit = async () => {
    await this.setState({ loadstatus: true })
    try {
      const { data } = this.state;
       await auth.login(data.Email, data.Password);
      if (data) {
        toast.success("Login Successful");
      }
      setTimeout(() => {
        window.location = "/admin/index";
      }, 2000);
      // const { state } = this.props.location;
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.Email = ex.response.data.data;
         await this.setState({ errors });
        setTimeout( async () => {
        await this.setState({ loadstatus: false })     
        }, 2000);
      }
    }
  };


  render() {  
    if(auth.getCurrentUser()) return window.location = "/admin/index";
  return (
    <>
      <Col lg="" md="">
        <Card className="bg-secondary shadow border-0">
          <CardHeader>
            <div className="text-center text-muted mb-4">
              <h2>Admin Login</h2>
            </div>
            </CardHeader>
         
          <CardBody className="px-lg-5 py-lg-4">
            <Form role="form" onSubmit={this.handleSubmit}>
            
            {this.renderInput("Email", "Email Id")}           
            {this.renderInput("Password", "Password", "Password")}
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit" >
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>  
  );
}
};

export default Login;
