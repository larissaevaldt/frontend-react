import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import ListEmployee from "./components/ListEmployee";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateOrUpdateEmployee from "./components/CreateOrUpdateEmployee";
import ViewEmployee from "./components/ViewEmployee";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NotFound from "./components/NotFound";

import AuthService from "./services/AuthService";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  render() {
    return (
      <div>
        <Router>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/employees" component={ListEmployee}></Route>
              <Route
                path="/add-employee/:id"
                component={CreateOrUpdateEmployee}
              ></Route>
              <Route path="/view-employee/:id" component={ViewEmployee}></Route>
              <Route component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
