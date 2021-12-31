import  Forms  from 'components/Common/form';
import React from 'react';
import empauth from '../../services/empservice'
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

class ELogin extends Forms {
    state = { data: { Email: "", Password: "" }, errors: {},loadstatus:false };
    schema = {
      Email: Joi.string().required().email(),
      Password: Joi.string().required(),
    };
  
    doSubmit = async () => {
      await this.setState({ loadstatus: true })
  
      try {
        const { data } = this.state;
        const jwt = await empauth.login(data.Email, data.Password);
        console.log(jwt);
        // this.props.history.push('/');
        if (jwt.token) {
          toast.success("Login Successful");
          setTimeout(() => {
            window.location = "/emp/index";
          }, 2000);
        } else {
          toast(jwt.data);
        }
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
  return (
    <>
      <Col lg="" md="">
        <Card className="bg-secondary shadow border-0">
          <CardHeader>
            <div className="text-center text-muted mb-4">
              <h2>Employee Login</h2>
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

export default ELogin;
