import axios from "axios";

const http = axios.create({
  baseURL: "/api",
  timeout: 1000,
});

export default http;
