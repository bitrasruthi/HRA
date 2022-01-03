import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react';
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { addcompdet, getcomdet } from '../../../services/settings'
import Forms from 'components/Common/form';
import {
    Button,
    Card,
    Container,
    CardHeader,
    CardBody,
    Form,
    Row,
    Col,
} from "reactstrap";

class Orgprofile extends Forms {
    state = {
        data: {},
        inTime: '',
        outTime: '',
        errors: []
    }
    schema = {
        established: Joi.string().required(),
        type: Joi.string().required(),
        companyIdCode: Joi.string().required(),
        companyMailId: Joi.string().required(),
        companyContactNumber: Joi.string().required(),
    };
    async populateDetail(data) {
        if (!data.companyMailId) return;
        this.setState({ data: this.mapToViewModel(data) });

    }
    async componentDidMount() {
        try {
            const { data } = await getcomdet()
            const res = data[0]
            await this.populateDetail(res);
        }
        catch (ex) {
            toast('error')
        }
    }
    mapToViewModel(data) {
        return {
            established: data.established,
            type: data.type,
            companyIdCode: data.companyIdCode,
            companyMailId: data.companyMailId,
            companyContactNumber: data.companyContactNumber,
        };
    }


    doSubmit = async () => {
        const { data } = this.state
        try {
            const sett = await addcompdet(data)
            toast('sucess')

        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.established = ex.response.data.data;
                this.setState({ errors });
            }
        }
    };



    render() {
        return (
        <>
         <Container  fluid>
        <Row>
          <div className="col">
            <Card className="mt-8 shadow ">
            <CardHeader className="bg-gradient-orange text-center border-0 ">
              <h3 className="">Update Company Details</h3>
          </CardHeader>
          <CardBody className="px-lg-3 py-sm-5">
                        <Form role="form" onSubmit={this.handleSubmit}>
                            <Row>
                            <Col lg='4'>
                            {this.renderInput("established", "Established", 'date')}
                            </Col>
                            
                            <Col lg='4'>
                            {this.renderInput("type", "Type")}
                            </Col>
                            <Col lg='3'>
                            {this.renderInput("companyIdCode", "Company Id ")}
                            </Col>
                            </Row>
                            <Row>
                            <Col lg='6'>
                            {this.renderInput("companyMailId", "Mail id")}
                            </Col>
                            <Col lg='5'>
                            {this.renderInput("companyContactNumber", "Contact number")}
                            </Col>
                            </Row>


                            <div className="text-center ">
                            <Button disabled={this.state.loadstatus}  className="bg-teal my-4" type="submit">
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

export default Orgprofile;