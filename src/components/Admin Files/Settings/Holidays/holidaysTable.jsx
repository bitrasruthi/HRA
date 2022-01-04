import Table from "../../../Common/table";
import React from "react";
import DeleteHoil from "./deleteholi";
import { Link } from "react-router-dom";
import { Modal } from 'react-responsive-modal';
import Tables from 'components/Common/table';
import { toast } from "react-toastify";
import { deletehoil } from "services/settings";
import {
  Button,
  Card,
  Row,
  CardHeader,
  CardBody,
  Form,
  Col,
} from "reactstrap";

class HoliTable extends React.Component {

  state = {
    openModal: false,
    hoilidex: '',
  }
  onClickButton = e => {
    // e.preventDefault()
    this.setState({ openModal: true })
    console.log(e._id)
    this.setState({ hoilidex: e._id })
    // const dd = this.props.match.params.id 
    // console.log(this);
  }
  onCloseModal = () => {
    this.setState({ openModal: false })
  }
  columns = [
    { path: "SERIAL_NO", label: "S.NO" },
    { path: "date", label: "Date" },
    { path: "festival", label: "Festival" },
    {
      key: " Delete",
      label: 'Actions',
      content: (hoil) => (
        <button className="btn bg-pink btn-sm" onClick={() => this.onClickButton(hoil)} >
          <Link style={{ color: 'white' }} to={`/admin/holidays/${hoil._id}`}>
            Delete</Link></button>
      ),
    }
  ];

  state = {
    isLoading: null,
  };
  componentDidMount() {
    this.setState({ isLoading: false });
  }

  doSubmit = async (emp) => {
    this.setState({ disabled: true })
    try {
      const id = this.state.hoilidex
      // console.log(id._id)
      await deletehoil({ _id: id })
      toast.success('Holiday Deleted!!!')
      window.location = '/admin/holidays'

    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        toast('somthing worng')
        errors.EmployeeId = ex.response.data.data;
        this.setState({ errors });
      }
    }
  };

  constructor() {
    super();
    this.state = { isLoading: true };
  }

  render() {
    const { holidays, sortColumn, onSort, disabled, loading } = this.props;
    return (
      <div>

        <div className="mt--7">
          <Tables
            columns={this.columns}
            data={holidays}
            sortColumn={sortColumn}
            onSort={onSort}
            disabled={disabled}
            loading={loading}
          />

        </div>
        <Modal open={this.state.openModal} onClose={this.onCloseModal}>
          {/* <DeleteHoil
            hoilidex={this.state.hoilidex}
          /> */}
          <div className="pt-2" >
            <Card className="mt-2 bg-white shadow border-0" >
              <CardBody className="px-lg-3 py-sm-5">
                <Form role="form" onSubmit={this.handleSubmit}>
                  <h3> Are you sure you want to delete?</h3>
                  <div className="text-center mt-3"  >
                    <Button className="bg-teal border-0" disabled={this.state.disabled} variant="contained" onClick={this.doSubmit}>
                      Yes
                    </Button>
                    <Button className="bg-cyan border-0" disabled={this.state.disabled} variant="contained" onClick={this.onCloseModal}>
                      No
                    </Button>

                  </div>

                </Form>
              </CardBody>

            </Card>
            <div>
            </div>
          </div>

        </Modal>
      </div>
    );
  }
}

export default HoliTable;
