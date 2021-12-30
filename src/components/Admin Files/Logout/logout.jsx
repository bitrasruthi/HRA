import React from "react";
import auth from "../../../services/authService";
import { toast } from "react-toastify";


class Logout extends React.Component {
  async componentDidMount() {

    const dd = auth.logout();
    if (!dd) toast("Logout successfull");
    this.props.history.push('/auth')
    setTimeout(() => {
      window.location = "/auth";
    }, 1000);

  }
  render() {

    return <div>

    </div>;
  }
}

export default Logout;
