import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class CreateOrUpdateEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      firstName: "",
      lastName: "",
      profession: "",
      city: "",
      branch: "",
    };
  }

  componentDidMount() {
    console.log(this.props);
    if (this.state.code === "_add") {
    } else {
      EmployeeService.getEmployeeByCode(this.state.id).then((res) => {
        let employee = res.data;
        this.setState({
          firstName: employee.firstName,
          lastName: employee.lastName,
          profession: employee.profession,
          city: employee.city,
          branch: employee.branch,
        });
      });
    }
  }

  saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    let employee = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      profession: this.state.profession,
      city: this.state.city,
      branch: this.state.branch,
    };
    console.log("employee => " + JSON.stringify(employee));

    if (this.state.id === "_add") {
      EmployeeService.createEmployee(employee).then((res) => {
        this.props.history.push("/employees");
      });
    } else {
      EmployeeService.updateEmployee(employee, this.state.id).then((res) => {
        this.props.history.push("/employees");
      });
    }
  };

  changeFirstNameHandler = (event) => {
    console.log(this);
    this.setState({ firstName: event.target.value });
  };
  changeLastNameHandler = (event) => {
    this.setState({ lastName: event.target.value });
  };
  changeProfessionHandler = (event) => {
    this.setState({ profession: event.target.value });
  };
  changeCityHandler = (event) => {
    this.setState({ city: event.target.value });
  };
  changeBranchHandler = (event) => {
    this.setState({ branch: event.target.value });
  };

  cancel() {
    this.props.history.push("/employees");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Add Employee</h3>;
    } else {
      return <h3 className="text-center">Update Employee</h3>;
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>First Name:</label>
                    <input
                      placeholder="First Name"
                      name="firstName"
                      className="form-control"
                      value={this.state.firstName}
                      onChange={this.changeFirstNameHandler}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label>Last Name:</label>
                    <input
                      placeholder="Last Name"
                      name="lastName"
                      className="form-control"
                      value={this.state.lastName}
                      onChange={this.changeLastNameHandler}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label>Profession:</label>
                    <input
                      placeholder="Profession"
                      name="profession"
                      className="form-control"
                      value={this.state.profession}
                      onChange={this.changeProfessionHandler}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label>City:</label>
                    <input
                      placeholder="City"
                      name="city"
                      className="form-control"
                      value={this.state.city}
                      onChange={this.changeCityHandler}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label>Branch:</label>
                    <input
                      placeholder="Branch"
                      name="branch"
                      className="form-control"
                      value={this.state.branch}
                      onChange={this.changeBranchHandler}
                    ></input>
                  </div>
                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateEmployee}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateOrUpdateEmployee;
