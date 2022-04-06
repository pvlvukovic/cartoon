import axios, { AxiosInstance } from "axios";

const baseUrl: string = process.env.REACT_APP_API_ENDPOINT || "";

const httpClient: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default httpClient;
