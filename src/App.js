import React from 'react';
import Login from './components/Footers/AuthFooter';
import store from '../src/reduxstore/store/index'
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Switch, Route, Redirect } from "react-router-dom";
import ELogin from './views/examples/ELogin';
import Holidays from './components/Admin Files/Settings/Holidays/holidays';




class App extends React.Component {
    render() { 
        return (
            <Provider store={store}>
            <React.Fragment>
              <ToastContainer />
  
              <main className="container">
                <Switch>
                <Route path="/auth/login" component={Login} />
                <Route path="empauth/elogin" component={ELogin} />
                <Route path="/admin/holidays" component={Holidays} />
                </Switch>
                </main>
                </React.Fragment>
                </Provider>

        )
    }
}
 
export default App;