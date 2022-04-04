import axios, { AxiosInstance } from "axios";

const baseUrl: string = "https://rickandmortyapi.com/api/";

const httpClient: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default httpClient;
