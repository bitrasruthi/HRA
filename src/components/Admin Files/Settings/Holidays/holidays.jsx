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

import {
  Button,
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
    sortColumn: { path: "Date", order: "asc" },
  };
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
      <Container fluid>
       
            <HoliTable
              holidays={holidays}
              sortColumn={sortColumn}
              onSort={this.handleSort}
              disabled={this.state.loadmore}
              loading={this.state.loading}
            />
           
            </Container>
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


