import axios from "axios";
import { toast } from "react-toastify";
// import authService from "./authService";
const endPoint = "https://nmdevteam.com/laravel/api";

axios.interceptors.request.use(
  function(request) {
    request.headers.common["Content-Type"] =
      "application/x-www-form-urlencoded";
    // request.headers.common['Access-Control-Allow-Origin'] = '*';
    request.headers.common["Accept"] = "application/json";
    // request.headers.common["Authorization"] = "Bearer " + api_token;
    console.log("Request", request);
    return request;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(null, error => {
  console.log("Error", error);
  const expectedErrors = error && error.status >= 400 && error.status < 500;
  console.log("expectedErrors", expectedErrors);
  if (!expectedErrors) {
    toast.error("An unexpected error occurred!");
  }

  return Promise.reject(error);
});

function setToken(api_token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + api_token;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  server: endPoint,
  setToken
};
