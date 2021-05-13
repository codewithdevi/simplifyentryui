import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://192.168.0.101:4000";

const register = (name, email, mobile, address) => {
  let data = {
    name: name,
    email: email,
    mobileNo: mobile,
    address: address
  }
  return axios.post(API_URL + "/register/visitor", data);
};

const login = (mobile) => {
  return axios.post(API_URL + "/login", {
      mobileNo: mobile
    })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};


const logentry = (info) => {
  return axios.post(API_URL + "/log/entry", info, { headers: authHeader() });
};

const getLogEntries = () => {
  return axios.get(API_URL + "/view/user/entries", { headers: authHeader() });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  logentry,
  getLogEntries
};
