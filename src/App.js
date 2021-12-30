import React from 'react';
import Login from './components/Footers/AuthFooter';
import store from '../src/reduxstore/store/index'
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Switch, Route, Redirect } from "react-router-dom";
import ELogin from './views/examples/ELogin';




class App extends React.Component {
    render() { 
        return (
            <Provider store={store}>
            <React.Fragment>
              <ToastContainer />
  
              <main className="container">
                <Switch>
                <Route path="/auth/login" component={Login} />
                <Route path="/auth/elogin" component={ELogin} />
                </Switch>
                </main>
                </React.Fragment>
                </Provider>

        )
    }
}
 
export default App;