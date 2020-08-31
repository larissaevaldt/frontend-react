import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class ViewEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      employee: {},
    };
  }

  componentDidMount() {
    console.log(this.props);
    EmployeeService.getEmployeeByCode(this.state.id).then((res) => {
      this.setState({ employee: res.data });
    });
  }

  cancel() {
    this.props.history.push("/employees");
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center">View Employee Details</h3>
          <div className="card-body">
            <div className="row">
              <label>Employee Code:</label>
              <div> {this.state.employee.id} </div>
            </div>
            <div className="row">
              <label>First Name:</label>
              <div> {this.state.employee.firstName} </div>
            </div>
            <div className="row">
              <label>Last Name:</label>
              <div> {this.state.employee.lastName} </div>
            </div>
            <div className="row">
              <label>Profession:</label>
              <div> {this.state.employee.profession} </div>
            </div>
            <div className="row">
              <label>City:</label>
              <div> {this.state.employee.city} </div>
            </div>
            <div className="row">
              <label>Branch:</label>
              <div> {this.state.employee.branch} </div>
            </div>
          </div>
        </div>
        <br />
        <div className="col text-center">
          <button className="btn btn-info" onClick={this.cancel.bind(this)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }
}

export default ViewEmployee;
