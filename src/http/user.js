import axios from "axios";
import { $authHost, $host } from ".";
import { jwtDecode } from "jwt-decode";

export const registration = async (email, password) => {
  try {
    const { data } = await $host.post("api/user/registration", {
      email,
      password,
    });
    localStorage.setItem("token", data.accessToken);
    return jwtDecode(data.accessToken);
  } catch (e) {
    console.log(e);
  }
};

export const login = async (email, password) => {
  try {
    const { data } = await $host.post("api/user/login", {
      email,
      password,
    });
    localStorage.setItem("token", data.accessToken);
    return jwtDecode(data.accessToken);
  } catch (e) {
    console.log(e);
  }
};

export const logout = async () => {
  try {
    const { data } = await $authHost.post("api/user/logout");
    localStorage.removeItem("token");
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getUsers = async () => {
  try {
    const { data } = await $authHost.get("api/user/users");
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const check = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_CLIENT}api/user/refresh`,
      { withCredentials: true }
    );
    localStorage.setItem("token", response.data.accessToken);
    return jwtDecode(response.data.accessToken);
  } catch (e) {
    console.log(e);
    localStorage.removeItem("token");
  }
};
