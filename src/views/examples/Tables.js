import TerminateEmpTable from './../../components/Admin Files/Terminate Emp/terminateEmpTable';
import Joi from 'joi-browser';
import { toast } from "react-toastify";
import Forms from 'components/Common/form';
import get_termlist from 'reduxstore/actions/terminateAction';
import { get_moretermlist } from 'reduxstore/actions/terminateAction';
import { saveskip } from 'reduxstore/actions/terminateAction';
import { connect } from 'react-redux';
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components

class TerminateEmp extends Forms {
  state = {
    data: {
      EmployeeId: "",
      Reason: '',
      AgreementDone: '',
    },
    errors: [],
    limit: 2,
    skip: 0,
    i: 0,
    loadstatus: false,
    loading: false,
    employees: [],
    sortColumn: { path: "", order: "" },

  };

  schema = {
    EmployeeId: Joi.string().required(),
    Reason: Joi.string().min(5).required(),
    AgreementDone: Joi.string().required(),
  };

  async componentDidMount() {
    try {
      await this.setState({ loadstatus: true, loading: false });
      if (!this.props.getterminatedlist) {
        await get_termlist(this.state.skip);
        await this.setState({ i: this.state.i + 1 })
      }

      // const {data:movies} = await getMovies();
      const dd = await this.props.getterminatedlist;
      console.log(dd)
      await this.setState({ employees: dd.data, i: dd.skip || 1 });
      await this.setState({ loadstatus: false, loading: true });
    }
    catch (ex) {
      if (ex.response && ex.response.status === 404) {
        await this.setState({ loadstatus: true, loading: true });
        toast("no data")
      }
      if (ex.response && ex.response.status === 400) {
        await this.setState({ loadstatus: true, loading: true });

      }
    }
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };


  onloadmore = async () => {
    const { i, limit, employees } = this.state

    try {
      await this.setState({ loadstatus: true });
      var skip = i * limit
      await this.setState({ i: this.state.i + 1 })
      console.log(i)
      await get_moretermlist(skip, i)
      const dd = await this.props.getterminatedlist.data;
      if (dd.length === employees.length) {

      }
      await this.setState({ employess: dd })
      await this.setState({ loadstatus: false });

    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        await saveskip(this.state.i)
        toast.error(ex.response.data.data);
        await this.setState({ loadstatus: true })
      }
      if (ex.response && ex.response.status === 400) {
        await saveskip(this.state.i)
        await this.setState({ loadstatus: true })
      }
    }
  };
  render() {
    const { sortColumn, employees: data } = this.state;


return (
    <>
      {/* Page content */}
      <Container className="mt" fluid>
      <Row>
          <div className="mt-8 col">
            <Card className="shadow border-0">
            <TerminateEmpTable
          employees={data}
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
    getterminatedlist: state.getterminatedlist,
  };
};

export default connect(mapStateToProps)(TerminateEmp);
