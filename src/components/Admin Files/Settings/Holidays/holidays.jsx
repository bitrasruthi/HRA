import Sidebar from "components/Sidebar/Sidebar";
import React from "react";
import Joi from "joi-browser";
import Forms from 'components/Common/form';
import _ from "lodash";
import HoliTable from "./holidaysTable";
import { connect } from "react-redux";
import get_hoildays from "../../../../reduxstore/actions/hoildaysActions";
import { postholidays } from '../../../../services/settings'
import { toast } from 'react-toastify'
import { Modal } from 'react-responsive-modal';

import {
  Button,
  CardHeader,
  Container,
  Row,
  Card,
  CardBody,
  Form,
  Col,
} from "reactstrap";

class Holidays extends Forms {
  state = {
    data: { date: '', festival: '' },
    isLoading: true,
    loadmore: true,
    loading: true,
    holidays: [],
    errors: [],
    openModal: false,
    sortColumn: { path: "Date", order: "asc" },
  };
  
  onClickButton = e => {
    // e.preventDefault()
    this.setState({ openModal: true })
    // console.log(e.SERIAL_NO - 1)
  }
  onCloseModal = () => {
    this.setState({ openModal: false })
  }
  schema = {
    date: Joi.string().required(),
    festival: Joi.string().required(),
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };


  constructor() {
    super();
    this.state.isLoading = true;
  }

  async componentDidMount() {
    try {
      if (!this.props.gethoildayslist) {
        await get_hoildays();
      }
    
      var dd = await this.props.gethoildayslist[0].holidays;
      // const ff = dd[0].holidays;
      var gg = dd.map(function (currentValue, Index) {
        currentValue.SERIAL_NO = Index + 1
        return currentValue
        
      })
    

      await this.setState({ holidays: dd });

    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast('400')
      }
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data.data);
      }
    }
  }



  doSubmit = async () => {
    const { data, holidays } = this.state
    try {
      await postholidays(data)
      var ff = { ...this.state.holidays, data }
      holidays.push(ff.data)
      await this.setState({ holidays, data: { date: '', festival: '' } })
      toast.success('Holiday Added!!!')
      window.location = '/admin/holidays'
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.festival = ex.response.data.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const { sortColumn, holidays } = this.state;
    return (
      <>
      {/* Page content */}
      <div  className="text-center">

<Button className="mt-7 bg-gradient-orange border-0 " onClick={this.onClickButton}>Add New Holiday</Button>
</div>
      <Container fluid>
        
            <HoliTable
              holidays={holidays}
              sortColumn={sortColumn}
              onSort={this.handleSort}
              disabled={this.state.loadmore}
              loading={this.state.loading}
            />
           
            </Container>
            <Modal open={this.state.openModal} onClose={this.onCloseModal}>
          {/* <DeleteHoil
            hoilidex={this.state.hoilidex}
          /> */}
     <div className=" pt-4" >
          <Card className="bg-secondary shadow border-0" >
            {/* <CardHeader className="bg-gradient-teal border-0">
              <Col xs="9">
                <h3 className=" ml-4 text-center">Add New Holiday here:</h3>
              </Col>
            </CardHeader> */}
            <CardBody className="px-lg-3 py-sm-5">
              <Form role="form" onSubmit={this.handleSubmit}>
                {/* {this.renderInput("EmployeeId", "Employee Id",)} */}

                  {this.renderInput("date", "Date", 'date')}
                  {this.renderInput("festival", "Festival")}

                {/* <input type="radio" name="option" id="1" value="Yes" />
                      <input type="radio" name="option" id="2" value="No" /> */}
                <div className="text-center " >
                  <Button className='bg-teal border-0'disabled={this.state.disabled} variant="contained" onClick={this.handleSubmit}>
                  Add Holiday
                  </Button>

                </div>

              </Form>
            </CardBody>

          </Card>
        <div>
        </div>
      </div>

        </Modal>
            
            </>
         
    );
  }
}

const mapStateToProps = (state) => {
  return {
    gethoildayslist: state.gethoildayslist,
  };
};

export default connect(mapStateToProps)(Holidays);


