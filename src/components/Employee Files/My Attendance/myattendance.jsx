import React from "react";
import EmpTable from "./attTable";
import get_attlist, { get_moreattlist } from "../../../reduxstore/actions/attAction";
import emp from "../../../services/empservice";
import { connect } from "react-redux";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Forms from "components/Common/form";
import getCSRFToken from '../../../../src/services/httpService'



import {
  Button,
  Container,
  Row,
  Card,
  CardBody,
  Form,
  Col,
} from "reactstrap";


class AttList extends Forms {
  state = {
    data: { to_Date: "", from_Date: "" },
    employess: [],
    limit: 2,
    skip: 0,
    i: 0,
    isLoading: true,
    loadstatus: false,
    loading: false,
    errors: [],
    sortColumn: { path: "", order: "" },
  };
  constructor() {
    super();
    this.state.isLoading = true;
  }

  schema = {
    from_Date: Joi.string().required(),
    to_Date: Joi.string().required(),
  };



  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  doSubmit = async () => {
    try {
      const { data, employess } = this.state;
      const jwt = await emp.getCurrentUser()

      var ss = { ...data, EmployeeId: jwt.EmployeeId };
      await this.setState({ data: ss });
      const atts = await emp.getAttendanceserc(this.state.data);
      await this.setState({ employess: atts.data });
      await this.setState({ data: { to_Date: "", from_Date: "" } });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.to_Date = ex.response.data.data;
        this.setState({ errors });
      }
    }
  };



  async componentDidMount() {

    await this.setState({ loadstatus: true, isLoading: true, })
    try {
      if (!this.props.getattlist) {
        await get_attlist(this.state.skip);
        // const tt = getCSRFToken()
        // console.log(tt);
        await this.setState({ i: this.state.i + 1 })
      }

      const dd = await this.props.getattlist;
      await this.setState({ employess: dd, i: dd.skip || 1 });
      await this.setState({ isLoading: false, loadstatus: false });
    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ isLoading: false });
        toast("no data")
      }
    }
    // const jwt = await emp.getCurrentUser();
    // const id = jwt.EmployeeId;
    // const dd = await emp.getAttendance(id);
    // this.setState({
    //   employess: dd.data,
    // });
  }


  onloadmore = async () => {
    const { i } = this.state
    await this.setState({ loadstatus: true, loading: false })
    try {
      var skip = i * 2
      await this.setState({ i: this.state.i + 1 })

      const rr = await get_moreattlist(skip)
      console.log(rr)
      const dd = await this.props.getattlist;
      await this.setState({ employess: dd })
      await this.setState({ loadstatus: false, loading: true })

    } catch (ex) {
      if (ex.response && ex.response.status === 404) {

        toast.error(ex.response.data.data);
        await this.setState({ loadstatus: false, loading: false })

      }
      if (ex.response && ex.response.status === 400) {
        await this.setState({ loadstatus: true, i: this.state.i - 1 })
        await this.setState({ loading: true })
        console.log(ex.response.status)

      }
    }
  };

  render() {
    const { sortColumn, employess, loading } = this.state;
    return (<>
      {/* Page content */}
      <Container fluid>

        <EmpTable
          employess={employess}
          sortColumn={sortColumn}
          onSort={this.handleSort}
          onload={this.onloadmore}
          disabled={this.state.loadstatus}
          loading={loading}
        />

      </Container>

    </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getattlist: state.getattlist,
  };
};

export default connect(mapStateToProps)(AttList);
