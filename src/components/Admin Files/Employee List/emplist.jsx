import React from "react";

import _ from "lodash";
import { connect } from "react-redux";
import get_employeelist, { get_moreemployeelist } from "../../../reduxstore/actions/employeeAction";
import EmployeeTable from "../Employee List/emplisttable";

import { toast } from "react-toastify";
import { Col } from "reactstrap";
import { Card, Container, Row } from "reactstrap";
import Header from "components/Headers/Header.js";




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

    // if(count === 0)return <p>No movies available in the selected list</p>;


    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow ">

                <Col className="px-lg-4 py-sm-5" >

                  <EmployeeTable
                    employees={data}
                    sortColumn={sortColumn}
                    onSort={this.handleSort}
                    onload={this.onloadmore}
                    disabled={this.state.loadstatus}
                    loading={this.state.loading}
                  // onDelete={this.handleDelete}
                  />
                </Col>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getemployeelist: state.getemployeelist,
  };
};

export default connect(mapStateToProps)(Employees);
