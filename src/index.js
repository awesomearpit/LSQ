import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axiosInitializer from "./axios_Initilizer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

axiosInitializer.config();

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
