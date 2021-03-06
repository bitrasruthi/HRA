import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import store from '../src/reduxstore/store/index'
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";


import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import { ToastContainer } from "react-toastify";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import App from './App';
import EmpLayout  from 'layouts/Emp.js';
import Holidays from './components/Admin Files/Settings/Holidays/holidays';
import EmpAuthLayout from 'layouts/EmpAuth.js'

ReactDOM.render(
  <Provider store={store}>

  <BrowserRouter>
    <ToastContainer />
    <Switch>

      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/emp" render={(props) => <EmpLayout {...props} />} />
      <Route path="/empauth" render={(props) => <EmpAuthLayout {...props} />} />

      {/* <App/> */}
    </Switch>
  </BrowserRouter>,
  </Provider>
,
  document.getElementById("root")
);