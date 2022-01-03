import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react';
import Joi from 'joi-browser';
import { toast } from "react-toastify";
import Forms from 'components/Common/form';
import { empresetpass } from '../../../services/empservice'
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Form,
    Container,
    CardHeader,
    Row,
    Col,
} from "reactstrap";


class EmpRestPassword extends Forms {
    state = {
        data: {
            EmployeeId: "",
            Password: "",

        },
        loadstatus: false,
        errors: [],

    };

    schema = {
        EmployeeId: Joi.string().required(),
        Password: Joi.string().required(),
    };


    doSubmit = async () => {
        try {
            await this.setState({ loadstatus: true })
            console.log(this.state.data)
            await empresetpass(this.state.data)
            toast('Password Reset Success')

        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.EmployeeId = ex.response.data.data;
                await this.setState({ errors });
                await this.setState({ loadstatus: true })

            }
        }

        // this.props.history.push("/admin/addemployee");
    };

    render() {
        return ( 
        <>
        <Container fluid>
          <Row>
            <div className="px-lg-9 lg-4 col">
              <Card className="mt-8 shadow border-0">
                    <CardHeader className="bg-gradient-orange text-center">
                         <h3 className="">Reset Employee Password</h3>
                </CardHeader>
                <CardBody className="px-lg-3 py-sm-5">
                    <Form role="form" onSubmit={this.handleSubmit}>

                        {this.renderInput("EmployeeId", "Employee ID")}
                        {this.renderInput("Password", "Password")}

                        <div className="text-center">
                            <Button disabled={this.state.loadstatus} style={{ background: '#2DCECB', border: 'none' }} className="my-4" color="primary" type="submit">
                                Reset Password
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
            </div>
            </Row>
            </Container>

        </>
    )
        }
}

export default EmpRestPassword;