
import React from "react";
import get_employeelist from "reduxstore/actions/employeeAction";
import { toast } from "react-toastify";
import { get_moreemployeelist } from "reduxstore/actions/employeeAction";
import EmployeeTable from './../../components/Admin Files/Employee List/emplisttable';
import { connect } from "react-redux";
// reactstrap components
import { Card, Container, Row } from "reactstrap";



class Employees extends React.Component {
  state = {
    employees: [],
    searchQuery: "",
    sortColumn: {},
    isLoading: true,
    loadstatus: false,
    limit: 2,
    skip: 0,
    loading: false,
    i: 0,
  };

  constructor(props) {
    super(props);
    // this.state.isLoading = true;
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  async componentDidMount() {
    await this.setState({ loadstatus: true, loading: false })
    try {
      if (!this.props.getemployeelist) {
        await get_employeelist(this.state.skip);
        await this.setState({ i: this.state.i + 1 })
      }

      // const {data:movies} = await getMovies();
      const dd = await this.props.getemployeelist;
      console.log(dd)
      await this.setState({ employees: dd.data, i: dd.skip || 1 });
      await this.setState({ loadstatus: false, loading: true });

    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        // this.setState({ isLoading: false });
        toast("no data")
      }
    }
  }


  handleSort = (sortColumn) => this.setState({ sortColumn });

  onloadmore = async () => {
    const { i } = this.state
    await this.setState({ loadstatus: true, loading: false });

    try {
      var skip = i * 2
      await this.setState({ i: this.state.i + 1 })

      await get_moreemployeelist(skip)
      const dd = await this.props.getemployeelist.data;
      await this.setState({ employees: dd })
      await this.setState({ loadstatus: false, loading: true });

    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        // toast.error("No data");
        toast.error(ex.response.data.data);

        await this.setState({ loadstatus: true, loading: true });
      }
      if (ex.response && ex.response.status === 400) {
        await this.setState({ loading: true, loading: true });

      }
    }
  };
  render() {
    const {

      sortColumn,
      employees: data
    } = this.state;
  return (
    <>
      {/* Page content */}
      <Container fluid>
       
            <EmployeeTable
            employees={data}
            sortColumn={sortColumn}
            onSort={this.handleSort}
            onload={this.onloadmore}
            disabled={this.state.loadstatus}
            loading={this.state.loading}
          // onDelete={this.handleDelete}
          />
         
      </Container>
    </>
  );
}
};

const mapStateToProps = (state) => {
  return {
    getemployeelist: state.getemployeelist,
  };
};

export default connect(mapStateToProps)(Employees);
