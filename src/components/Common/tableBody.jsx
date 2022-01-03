import React from "react";
import _ from "lodash";
// import ReactLoading from "react-loading";
import { Button } from 'reactstrap';
import { Row } from 'reactstrap';
import { Col } from 'reactstrap';


class TableBody extends React.Component {
  state = {
    isLoading: true,
  };




  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  createkey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  constructor() {
    super();
    this.state = { isLoading: true };
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  render() {
    const { data, columns, onload, disabled } = this.props;
    return (
      <>
        <tbody className="text-center">

          {data.map((item) => (
            <tr  key={item._id}>
              
              {columns.map((column) => (
                <td  key={this.createkey(item, column)}>
                  {this.renderCell(item, column)}
                </td>
              ))}
            </tr>
          ))}
         

        </tbody>

      </>
    );
  }
}

export default TableBody;
