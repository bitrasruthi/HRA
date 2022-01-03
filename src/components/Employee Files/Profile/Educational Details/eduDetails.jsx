import React from 'react';
import { toast } from 'react-toastify'
import _ from 'lodash'

import Joi from 'joi-browser';
import Forms from 'components/Common/form';
import { updateEduDetails } from 'services/eduService';
import { registerEduDetails } from 'services/eduService';

import {
  Button,
  CardHeader,
  Card,
  CardBody,
  Form,
  Row,
  Col,
} from "reactstrap";
import EduCard from './eduCard';
// core components

class EduDetails extends Forms {
  state = {
    data: { institute: "", passedoutYear: '', percentage: '' },
    employees: [],
    pageSize: 4,
    id: [],
    errors: [],
    currentPage: 1,
    disabled: false,
    date: new Date(),
    sortColumn: { path: "FirstName", order: "asc" },
    options: [" select", "ssc", "degree", 'pg', 'ug'],
  }

  schema = {

    // qualification: Joi.string(),
    institute: Joi.string().min(3).max(50).required(),
    passedoutYear: Joi.number().integer().max(this.state.date.getFullYear()).required(),
    percentage: Joi.number().integer().min(3).max(100).required(),

  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };



  componentDidMount() {
    const data = { ...this.state.data, qualification: 'ssc' }
    console.log(data.qualification);
  }



  doSubmit = async () => {
    this.setState({ disabled: true })
    try {
      const data = { ...this.state.data, qualification: 'ssc' }
      console.log(data.percentage)
      const pp = (data.institute);
      await this.setState({ data: { qualification: data.qualification } })
      if (pp === []) { await registerEduDetails(data.institute, data.passedoutYear, data.percentage) }
      else if (pp.qualification === 'ssc' || 'degree' || 'ug' || 'pg') {
        await updateEduDetails(data)

      }

      //  const tt = await this.setState({data: pp.data});
      //   console.log(tt);
      toast.success("Education details Updated Successfully");
      setTimeout(() => {
        window.location = "/profile";
      }, 2000);

    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {

        const errors = { ...this.state.errors };
        toast.error(ex.response.data.data);
        console.log(this.state)
        errors.institute = ex.response.data.data;
        await this.setState({ errors });

        setTimeout(async () => {
          await this.setState({ disabled: false })
        }, 2000);

      }
    }

  }


  render() {
    const { disabled } = this.state
    return (
      <>

        <div  >
          <Col lg="9" md="9" >
            <Card className="bg-secondary shadow border-0" >
              <CardHeader className="bg-gradient-purple border-0">
                <Col  xs="9">
                  <h3 className="mb--3">SSC Details</h3>
                </Col>
              </CardHeader>
              <CardBody  className="px-lg-3 py-sm-5">
                <Form role="form" onSubmit={this.handleSubmit}>
                  {/* {this.renderInput('qualification', 'Qualification', this.state.data.qualification )} */}

                  {/* {this.renderDropdown("qualification", "Qualification", options)} */}
                  {this.renderInput("institute", "Institute",)}
                  <Col sm={{ size: 6 }} >
                    {this.renderInput("passedoutYear", "Year of Pass",)}
                  </Col>
                  <Col sm={{ size: 6 }}  className='mr-sm-2'>
                    {this.renderInput("percentage", "Percentage",)}
                  </Col>

                  <div className="text-center">
                    <Button disabled={disabled} 
                      className="" color="primary" type="submit" >
                      Update
                    </Button>

                  </div>

                </Form>
              </CardBody>
            </Card>
          </Col>
        </div>

        <div>
        </div>


        {/* </div> */}
      </>
    );
  };
}

export default EduDetails;
