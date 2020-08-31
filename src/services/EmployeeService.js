import axios from "axios";
import authHeader from "./auth-header";

class EmployeeService {
  getEmployees() {
    return axios.get("/api/employees", { headers: authHeader() });
  }
  createEmployee(employee) {
    return axios.post("/api/employees", employee, {
      headers: authHeader(),
    });
  }
  getEmployeeByCode(employeeCode) {
    return axios.get("/api/employees/" + employeeCode, {
      headers: authHeader(),
    });
  }
  updateEmployee(employee, employeeCode) {
    return axios.put("/api/employees/" + employeeCode, employee, {
      headers: authHeader(),
    });
  }
  deleteEmployee(employeeCode) {
    return axios.delete("/api/employees/" + employeeCode, {
      headers: authHeader(),
    });
  }
}

export default new EmployeeService();
