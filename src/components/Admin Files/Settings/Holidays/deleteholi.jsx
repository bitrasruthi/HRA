import React from "react";
import { connect } from "react-redux";
import Forms from "../../../Common/form";
import { deletehoil } from '../../../../services/settings'
import { toast } from "react-toastify";
import { deleteEmp } from "services/authService";
import Joi from 'joi-browser';

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Form,
    Col,
} from "reactstrap";

class DeleteHoil extends Forms {
    state = {
        data: {
            Reason: '',
            AgreementDone: '',
        },
        leaveid: {},
        errors: [],
        employees: [],
        disabled: false,
        showPopup: true,
        openModal: false
    };





    doSubmit = async (emp) => {
        this.setState({ disabled: true })
        try {
            const id = this.props.hoilidex
            console.log(id)
            await deletehoil({ index: id })

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

    }


    render() {
        const { leave } = this.state;
        return (


            <div   >
                <Col lg="9" md="9">
                    <Card className="mt-4 bg-secondary shadow border-0" >
                       
                        <CardBody  className="px-lg-3 py-sm-5">
                            <Form role="form" onSubmit={this.handleSubmit}>
                                <h3> Are you sure you want to delete?</h3>
                                <div className="text-center mt-3"  >
                                    <Button className="bg-teal border-0" disabled={this.state.disabled} variant="contained" onClick={this.doSubmit}>
                                        Yes
                                    </Button>
                                    <Button className="bg-cyan border-0" disabled={this.state.disabled} variant="contained" onClick={this.onCloseModal}>
                                        No
                                    </Button>

                                </div>

                            </Form>
                        </CardBody>

                    </Card>
                </Col>
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

export default connect(mapStateToProps)(DeleteHoil);

