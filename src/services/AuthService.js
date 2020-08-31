import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/users";

class AuthService {
  async login(loginDto) {
    const response = await axios.post(
      EMPLOYEE_API_BASE_URL + "/signin",
      loginDto
    );

    if (response.data) {
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(loginDto) {
    return axios.post(EMPLOYEE_API_BASE_URL + "/signup", loginDto);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
