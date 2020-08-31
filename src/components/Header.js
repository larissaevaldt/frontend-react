import React, { Component } from "react";
import AuthService from "../services/AuthService";

class Header extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: AuthService.getCurrentUser(),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const currentUser = this.state.currentUser;

    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div>
              <a href="/employees" className="navbar-brand">
                Employee Management App
              </a>
            </div>
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="/sign-in" className="nav-link" onClick={this.logOut}>
                    Logout
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="/sign-in" className="nav-link">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/sign-up" className="nav-link">
                    Sign Up
                  </a>
                </li>
              </div>
            )}
          </nav>
        </header>
      </div>
    );
  }
}

export default Header;
