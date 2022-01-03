import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react';
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { save, gettime } from '../../../services/settings'
import Forms from 'components/Common/form';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Container,
    Form,
    Row,
    Col,
} from "reactstrap";

class OfficeHours extends Forms {
    state = {
        data: {},
        inTime: '',
        outTime: '',
        errors: []
    }
    schema = {

        inTime: Joi.string().required(),
        outTime: Joi.string().required(),
    };

    async componentDidMount() {
        const time = await gettime()
        const present = { ...time.data[0] }
        await this.setState({ inTime: present.inTime, outTime: present.outTime })
    }


    doSubmit = async () => {
        const { data } = this.state
        try {
            const sett = await save(data)
            const dd = sett.data.data

            await this.setState({ data: { established: '', type: '', inTime: '', outTime: '' } });
            this.setState({ inTime: dd.inTime, outTime: dd.outTime })


        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.established = ex.response.data.data;
                this.setState({ errors });
            }
        }
    };



    render() {
        return <>
        {/* Page content */}
        <Container fluid>
          <Row>
            <div className="px-lg-9 col">
              <Card className="mt-8 shadow border-0">
                    <CardHeader className="bg-gradient-orange">
                        <Row>
                            <Col>

                            <h3 >In Time: {this.state.inTime} </h3>
                            </Col>
                            <Col>
                            <h3 >Out Time: {this.state.outTime} </h3>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody className="align-items-center px-lg-3 py-sm-5 ml">
                        <Form role="form" onSubmit={this.handleSubmit}>

                            <Row>
                                <Col lg='5'>
                            {this.renderInput("inTime", "InTime", 'time')}
                            </Col>
                            <Col lg='5'>
                            {this.renderInput("outTime", "outTime", 'time')}
                            </Col>
                            </Row>    
                            <div className="text-center">
                                {/* {this.renderButton("Save")} */}
                                <Button style={{ marginLeft: '0px', marginTop: '0px', background: '#2DCEC8', color: 'white', border: 'none' }} variant="contained" onClick={this.onApprove}>
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
    }
}

export default OfficeHours;