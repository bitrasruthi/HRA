import React from "react";
import Table from "../../Common/table";
import { Link } from "react-router-dom";
// import { Spinner } from '../spinner';
import Tables  from 'components/Common/table';

class TerminateEmpTable extends React.Component {
  columns = [
    { path: "EmployeeId", label: "Employee Id" },
    { path: "EmployeeName", label: "Employee Name" },
    { path: "Reason", label: "Reason" },
    { path: "AgreementDone", label: "Agreement" },
  ];

  render() {
    const { employees, onSort, sortColumn, onload, disabled, loading } = this.props;
    return (
      <div>
      <Tables
        columns={this.columns}
        data={employees}
        sortColumn={sortColumn}
        onSort={onSort}
        onload={onload}
        disabled={disabled}
        loading={loading}
      // LoadingComponent={Spinner}
      />
      </div>
    );
  }
}

export default TerminateEmpTable;
