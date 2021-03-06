import React from "react";
import Table from "../../Common/table";
// import { Spinner } from '../spinner';

class Hrstable extends React.Component {
    columns = [
        { path: "EmployeId", label: "Employe Id", },
        { path: "lastMonthHours", label: "lastMonthHours" },
        { path: "lastWeekHours", label: "lastWeekHours" },
        { path: "monthWorkingdays", label: "Working Days" },
    ];

    render() {
        const { employees, sortColumn, onSort, disabled, loading } = this.props;
        return (
            <Table
                columns={this.columns}
                sortColumn={sortColumn}
                onSort={onSort}
                data={employees}
                disabled={disabled}
                loading={loading}

            />
        );
    }
}

export default Hrstable;
