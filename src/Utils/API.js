import axios from "axios";
import { SECRET_KEY, ACCESS_KEY } from "./Constants";
import cookie from "react-cookies";

export const headerConfig = {
    "Content-Type": "application/json"
};
  
export const register = async signupData => {
    return await axios.post(`/api/Authentication/Register?accessKey=${ACCESS_KEY}&secretKey=${SECRET_KEY}`, signupData, headerConfig);
};

export const signIn = async loginData => {
    return await axios.post(`/api/Authentication/Signin?accessKey=${ACCESS_KEY}&secretKey=${SECRET_KEY}`, loginData);
};

export const logout = async () => {
    await cookie.remove("AuthKey", { path: "/" });
};

export const post = async ( basePath,data) => {
    return await axios.post(`${basePath}`, data, headerConfig);
};

export const get = async basePath => {
    return await axios.get(`${basePath}`);
};
