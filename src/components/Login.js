import React, { Component } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";

import AuthService from "../services/AuthService";

// const required = (value) => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loading: false,
    };

    // this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  onChangeUsername(event) {
    this.setState({ username: event.target.value });
    console.log(this.username);
  }

  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });

    //     if (formValid(this.state.formErrors)) {
    //       console.log(`
    //         --SUBMITTING--
    //         Username: ${this.state.username}
    //         Password: ${this.state.password}
    //       `);
    //     } else {
    //       console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    //     }
    //   };

    let loginDto = {
      username: this.state.username,
      password: this.state.password,
    };
    //     // //have a look on what this does
    //     // this.form.validateAll();
    //     // if (this.checkBtn.context._errors.length === 0) {
    //     //   AuthService.login(this.state.username, this.state.password).then(
    //     //     () => {
    //     //       this.props.history.push("/employees");
    //     //       window.location.reload();
    //     //     },
    //     //     (error) => {
    //     //       const resMessage =
    //     //         (error.response &&
    //     //           error.response.data &&
    //     //           error.response.data.message) ||
    //     //         error.message ||
    //     //         error.toString();
    //     //       this.setState({
    //     //         loading: false,
    //     //         message: resMessage,
    //     //       });
    //     //     }
    //     //   );
    //     // } else {
    //     //   this.setState({
    //     //     loading: false,
    //     //   });
    //     // }
    AuthService.login(loginDto).then((res) => {
      this.props.history.push("/employees");
    });
    //   }
  };

  //   handleChange = (e) => {
  //     e.preventDefault();
  //     const { name, value } = e.target;
  //     let formErrors = { ...this.state.formErrors };

  //     console.log("Name: ", name);
  //     console.log("Value: ", value);

  //     switch (name) {
  //       case "username":
  //         formErrors.username =
  //           value.length < 6 ? "minimum 5 characters required" : "";
  //         break;
  //       case "password":
  //         formErrors.password = passRegex.test(value)
  //           ? ""
  //           : "password must be greater than 8 caracteres and contain at least one number";
  //         break;
  //       //   case "password":
  //       //     formErrors.password =
  //       //       value.length < 6 ? "minimum 6 characters required" : "";
  //       //     break;
  //       default:
  //         break;
  //     }

  //     this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  //   };

  render() {
    // const { formErrors } = this.state;
    return (
      <div className="container">
        <br />
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <div className="card-body">
              <form
                onSubmit={this.handleSubmit}
                // id="login-form"
                // data-parsley-validate
                // onSubmit={this.handleLogin}
                // ref={(c) => {
                //   this.form = c;
                // }}
              >
                <h3 className="text-center">SIGN IN</h3>

                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    className="form-control"
                    type="text"
                    name="username"
                    // className="form-control"
                    placeholder="Enter Username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    // className="form-control"
                    name="password"
                    value={this.state.password}
                    placeholder="Enter password"
                    onChange={this.onChangePassword}
                  />
                </div>

                <div className="form-group">
                  <button
                    className="btn btn-primary btn-block"
                    disabled={this.state.loading}
                  >
                    {this.state.loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                  </button>
                </div>

                {/* {this.state.message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {this.state.message}
                    </div>
                  </div>
                )}

                <CheckButton
                  style={{ display: "none" }}
                  ref={(c) => {
                    this.checkBtn = c;
                  }}
                /> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
