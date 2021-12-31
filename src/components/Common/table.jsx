import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import TableFooter from "./tableFooter";
import { Col } from 'reactstrap';


class Table extends React.Component {
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
        <table className="table table-bordered table-responsive-sm">
          <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort}/>

          <TableBody columns={columns} data={data} onload={onload} disabled={disabled} />


        </table>
            <TableFooter  onload={onload} disabled={disabled} loading={loading} />
       

      </div>
      // </div>
    );
  }
}

export default Table;
