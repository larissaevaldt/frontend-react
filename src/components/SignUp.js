import React, { Component } from "react";
import AuthService from "../services/AuthService";

const passRegex = RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

const formValid = (formErrors) => {
  let valid = true;
  //checks if the formErrors is empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });
  return valid;
};

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      formErrors: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
      },
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state.formErrors)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Username: ${this.state.username}
        Password: ${this.state.password}
      `);
      let loginDto = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        password: this.state.password,
      };
      AuthService.register(loginDto).then((res) => {
        this.props.history.push("/sign-in");
      });
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "username":
        formErrors.username =
          value.length < 5 ? "minimum 5 characaters required" : "";
        break;
      case "password":
        formErrors.password = passRegex.test(value)
          ? ""
          : "password must be at least 8 characters and contain at least one number";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;
    return (
      <form onSubmit={this.handleSubmit} noValidate>
        <h3>Sign Up</h3>

        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            className="form-control"
            placeholder="First Name"
            type="text"
            name="firstName"
            noValidate
            onChange={this.handleChange}
          />
          {formErrors.firstName.length > 0 && (
            <span className="errorMessage">{formErrors.firstName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            className="form-control"
            placeholder="Last Name"
            type="text"
            name="lastName"
            noValidate
            onChange={this.handleChange}
          />
          {formErrors.lastName.length > 0 && (
            <span className="errorMessage">{formErrors.lastName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            type="text"
            name="username"
            // className="form-control"
            placeholder="Enter Username"
            value={this.state.username}
            noValidate
            onChange={this.handleChange}
          />
          {formErrors.username.length > 0 && (
            <span className="errorMessage">{formErrors.username}</span>
          )}
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
            noValidate
            onChange={this.handleChange}
          />
          {formErrors.password.length > 0 && (
            <span className="errorMessage">{formErrors.password}</span>
          )}
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    );
  }
}
