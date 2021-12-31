import React from "react";
import Table from "../../Common/table";
import { Link } from "react-router-dom";
import { Modal } from 'react-responsive-modal';
import { Button } from "reactstrap";
import { connect } from "react-redux";
// import { Spinner } from '../spinner';
import { leavestatus } from "../../../services/leaveService";
import { toast } from "react-toastify";
import ApproveReject from './approvereject';
import 'react-responsive-modal/styles.css';




class LeaveTable extends React.Component {
  state = {
    showPopup: false,
    leave: {},
    openModal: false,
    leaveid: '',
    BackgroundColor: "BLACK"
  }

  onClickButton = e => {
    // e.preventDefault()
    if (e.status === 'pending') {
      this.setState({ openModal: true })
      console.log(e);
      this.setState({ leaveid: e._id })
      return;
    }
    toast('status already updated')
    // const dd = this.props.match.params.id 
    // console.log(this);
  }
  onCloseModal = () => {
    this.setState({ openModal: false })
  }
  columns = [
    {
      path: "EmployeeId",
      label: "Employee Id",
      // content: (emp) => (

      //   <Link to={`/leavelist/${emp.EmployeeId}`}>{emp.EmployeeId}
      //   {/* <Button onClick={this.onClickButton}></Button> */}
      //   </Link>
      // ),
    },
    { path: "EmployeeName", label: "Name" },

    { path: "from_Date", label: "From Date" },
    { path: "to_Date", label: "To Date" },
    { path: "subject", label: "Subject" },
    { path: "reason", label: "Reason" },
    { path: "leave_type", label: "Type of Leave" },
    {
      key: "Apprej",
      label: 'Approve/Reject',
      content: (emp) => (

        <button className={`btn btn-sm btn-${emp.status === 'pending' ? 'dark' : 
        `${emp.status === 'Rejected' ? 'danger'  : 'success'}`}`} onClick={() => this.onClickButton(emp)}>
          <Link style={{ color: 'white' }} to={`/admin/user-profile/${emp._id}`}> {emp.status}
          </Link></button>
      ),
    },

  ];

  async componentDidMount() {

    console.log()
    const dd = await this.props.getleavelist;
    // let leaveid = this.state.match.params.id
    console.log(dd);
    // let leave = leavelist.find((obj) => obj._id === leaveid);

    // await this.setState({ leave });
    // console.log(leave);
  }



  render() {
    const { leaves, onSort, sortColumn, onload, disabled, loading } = this.props;

    return (
      <div>

        <Table
          columns={this.columns}
          data={leaves}
          sortColumn={sortColumn}
          onSort={onSort}
          onload={onload}
          disabled={disabled}
          loading={loading}
        // LoadingComponent={Spinner}
        />

        <Modal open={this.state.openModal} onClose={this.onCloseModal}>
          <ApproveReject
            leaveid={this.state.leaveid} />

        </Modal>
      </div>
    );
  }
}

// export default LeaveTable;
const mapStateToProps = (state) => {
  return {
    getleavelist: state.getleavelist,
  };
};

export default connect(mapStateToProps)(LeaveTable);
