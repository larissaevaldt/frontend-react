import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class ListEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
      employees: [],
    };
    this.addEmployee = this.addEmployee.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    EmployeeService.getEmployees().then((res) => {
      this.setState({ employees: res.data });
    });
  }

  getData() {
    console.log(this.currentUser);
    let header = `{ Authorization: Bearer ${this.currentUser}}`;
    console.log(header);
  }

  viewEmployee(id) {
    this.props.history.push(`/view-employee/${id}`);
  }

  deleteEmployee(id) {
    EmployeeService.deleteEmployee(id).then((res) => {
      this.setState({
        employees: this.state.employees.filter(
          (employee) => employee.id !== id
        ),
      });
    });
  }

  editEmployee(id) {
    this.props.history.push(`add-employee/${id}`);
  }

  addEmployee() {
    this.props.history.push("/add-employee/_add");
  }

  render() {
    return (
      <div>
        <br></br>
        <h2 className="text-center">Employee List</h2>
        <div className="row">
          <div className="col text-center">
            <button
              style={{ marginBottom: "10px" }}
              className="btn btn-secondary"
              onClick={this.addEmployee}
            >
              Add Employee
            </button>
          </div>
        </div>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Employee Code</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Profession</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.profession}</td>
                  <td>
                    <button
                      onClick={() => this.editEmployee(employee.id)}
                      className="btn btn-info"
                    >
                      Update
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteEmployee(employee.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.viewEmployee(employee.id)}
                      className="btn btn-info"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListEmployee;
