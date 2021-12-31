import React from 'react';
import get_leavelist from 'reduxstore/actions/leaveAction';
import { toast } from 'react-toastify';
import { get_moreleavelist } from 'reduxstore/actions/leaveAction';
import LeaveTable from './../../components/Admin Files/Emp Leave List/leavetable';
import { connect } from 'react-redux';



import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
class LeaveList extends React.Component {
  state = {
    leaves: [],
    limit: 2,
    loadstatus: false,
    i: 0,
    skip: 0,
    searchQuery: "",
    sortColumn: { path: "", order: "" },
    isLoading: true,
    openModal: false,
    loading: false,

  };



  async componentDidMount() {
    await this.setState({ loadstatus: true, loading: false })
    try {

      if (!this.props.getleavelist) {
        await get_leavelist(this.state.skip);
        await this.setState({ i: this.state.i + 1 })
      }
      // const {data:movies} = await getMovies();
      // console.log(this.props.match.params.id);
      const dd = await this.props.getleavelist;
      // console.log(dd)
      await this.setState({ leaves: dd, i: dd.skip || 1 })

      await this.setState({ loadstatus: false, loading: true });

    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ isLoading: false });
        toast("no data")
      }
    }
  }

  onloadmore = async () => {
    const { i, limit } = this.state
    try {
      this.setState({ loadstatus: true, loading: false })
      var skip = i * limit
      await this.setState({ i: this.state.i + 1 })

      await get_moreleavelist(skip)
      const dd = await this.props.getleavelist;
      await this.setState({ leaves: dd })
      await this.setState({ loadstatus: false, loading: true });

    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data.data);
        await this.setState({ loadstatus: true, loading: true });


      }
      if (ex.response && ex.response.status === 400) {
        this.setState({ loadstatus: true, i: this.state.i - 1 })
        this.setState({ loadstatus: true, loading: true })

      }
    }
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => this.setState({ sortColumn });



  approveLeave = {
    key: "approve",
    content: (leave) => (
      <button
        onClick={() => this.props.onApprove(leave)}
        className="btn btn-danger btn-sm"
      >
        Approve
      </button>
    ),
  };

  handleApprove = () => {
    this.approveLeave();
  };

  render() {
    const { sortColumn, leaves: data } = this.state;

  return (
    <>
    {/* Page content */}
    <Container className="" fluid>
      <Row>
        <div className="mt-8 col">
          <Card className="shadow border-0">
          <LeaveTable
            leaves={data}
            sortColumn={sortColumn}
            onSort={this.handleSort}
            onload={this.onloadmore}
            disabled={this.state.loadstatus}
            loading={this.state.loading}

          />
          </Card>
        </div>
      </Row>
    </Container>
  </>
  );
};
}

const mapStateToProps = (state) => {
  return {
    getleavelist: state.getleavelist,
  };
};

export default connect(mapStateToProps)(LeaveList);

