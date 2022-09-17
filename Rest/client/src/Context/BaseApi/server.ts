import axios from "axios";
import { getToken } from "../../Utils/Token";

export const baseUrl = "http://localhost:5000/";

const server = axios.create({
  baseURL: baseUrl,
});

server.interceptors.request.use(
  (config) => {
    const jwtToken = getToken();
    config.headers = {
      Authorization: `Bearer ${jwtToken}`,
    };
    return config;
  },
  (error) => {
    console.log(error);
  }
);

export default server;
