import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import TableFooter from "./tableFooter";
import { Col, Table } from 'reactstrap';


class Tables extends React.Component {
  state = {
    isLoading: true,
  };

  constructor() {
    super();
    this.state.isLoading = true;
  }


  handleloading = () => { };

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  render() {
    const { columns, sortColumn, onSort, data, onload, disabled, loading } = this.props;
    return (
      
      <div 
        className=" px-2 py-sm-3 ">
        <Table className="mt-8 align-items-center" responsive>
          <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort}/>

          <TableBody columns={columns} data={data} onload={onload} disabled={disabled} />


        </Table>
            <TableFooter  onload={onload} disabled={disabled} loading={loading} />
       

      </div>
      // </div>
    );
  }
}

export default Tables;
