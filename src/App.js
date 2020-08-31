import React, { Fragment } from "react";
import Header from "./components/layout/Header";
import Dashboard from "./components/leads/Dashboard";
import Programs from "./components/module/Programs";
import Alerts from "./components/layout/Alerts";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";
import PrivateRoute from "./components/common/PrivateRoute";
import Admin from "./components/test/Admin";

import Cart from "./components/accounts/Cart";
import LeadDetail from "./components/leads/LeadDetail";
import InnerModule from "./components/module/InnerModule";
import Checkout from "./components/module/Checkout";
import history2 from "./history2";
import Main_dashboard from "./components/layout/Main_dashboard";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

// import { browserHistory } from "react";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import store from "./Store";
import { Provider } from "react-redux";
import { loadUser } from "./actions/auth";

import AdminLayout from "./components/test/Admin";

//alert options
const alertOptions = {
  timeout: 3000,
  position: "top center",
};

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router history={history2}>
            <Fragment>
              {/* <Header /> */}
              <Alerts />
              <div className="">
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <PrivateRoute exact path="/programs" component={Programs} />
                  <PrivateRoute exact path="/cart" component={Cart} />
                  <PrivateRoute exact path="/" component={Main_dashboard} />
                  <PrivateRoute exact path="/checkout" component={Checkout} />
                  <PrivateRoute
                    path="/admin"
                    component={(props) => <AdminLayout {...props} />}
                  />
                  <PrivateRoute
                    exact
                    path="/leadetail"
                    component={LeadDetail}
                  />
                  <PrivateRoute
                    exact
                    path="/inner-module"
                    component={InnerModule}
                  />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;
