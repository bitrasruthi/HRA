import React from "react";
import { connect } from "react-redux";
import Forms from "../../Common/form";
import { leavestatus } from "../../../services/leaveService";
import { toast } from "react-toastify";
import {
  Button,
  Row,
  Card,
  CardHeader,
  CardBody,
  Form,
  Col,
} from "reactstrap";


class ApproveReject extends Forms {
  state = {
    leave: {},
    data: {},
    showPopup: true
  };

  onReject = async () => {
    try {
      var leave = { ...this.state.leave };
      leave.status = "Rejected";
      await this.setState({ leave });
      // toast.success('Leave Rejected')

      console.log(leave);
      await leavestatus({ _id: this.props.leaveid, status: leave.status });
      window.location = "/admin/leavelist";
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data.data);
      }
    }
  };
  onApprove = async () => {
    try {
      var leave = { ...this.state.leave };
      leave.status = "Approved";
      await this.setState({ leave });
      // toast.success('Leave Approved')
      // console.log(this.props);
      await leavestatus({ _id: this.props.leaveid, status: leave.status });
      window.location = "/admin/leavelist";
      
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data.data);
      }
    }
  };

  async componentDidMount() {
    const dd = await this.props.getleavelist;
    // let leaveid = this.state.match.params.id
    await this.setState({ data: dd })
    console.log(this.props.getleavelist);
    // let leave = leavelist.find((obj) => obj._id === leaveid);

    // await this.setState({ leave });
    // console.log(leave);
  }

  render() {
    console.log(this.props.getleavelist[0].EmployeeName)
    return (
      <div className="pt-4" >
          <Card className="bg-secondary shadow border-0" >
            <CardHeader className="text-center bg-gradient-teal border-0">
              <Col xs="9">
                <h3 className="">Leave Action</h3>
              </Col>
            </CardHeader>
            <CardBody  className="text-center px-lg-3 py-sm-5">
              <div  className="row">
                <h3>Name: </h3>
                <p >{this.props.getleavelist[0].EmployeeName}</p>
              </div>
              <div className="row">
                <h3>From Date: </h3>
                <p>{this.props.getleavelist[0].from_Date}</p>
              </div>
              <div className="row">
                <h3>To Date: </h3>
                <p >{this.props.getleavelist[0].to_Date}</p>
              </div>
              <div className="row">
                <h3>Subject: </h3>
                <p >{this.props.getleavelist[0].subject}</p>
              </div>
              <div className="row">
                <h3>Reason: </h3>
                <p >{this.props.getleavelist[0].reason}</p>
              </div>
              <div >
                <Button 
                  variant="contained" className='bg-green border-0' onClick={this.onApprove}>
                  Approve
                </Button>
                <Button  variant="contained" className='bg-danger brder-0' onClick={this.onReject}>
                  Reject
                </Button>
              </div>
            </CardBody>
          </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getleavelist: state.getleavelist,
  };
};

export default connect(mapStateToProps)(ApproveReject);
