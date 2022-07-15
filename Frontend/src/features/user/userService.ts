import axios from "axios";

const API_URL = "http://localhost:5000/api/users/";

// Login
const login = async (email: string, password: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(
    API_URL + "/login",
    { email, password },
    config
  );
  localStorage.setItem("userInfo", JSON.stringify(response.data));

  return response.data;
};

const register = async (name: string, email: string, password: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(API_URL, { name, email, password }, config);
  localStorage.setItem("userInfo", JSON.stringify(response.data));

  return response.data;

}

const userService = {
  login,
  register
};

export default userService;
