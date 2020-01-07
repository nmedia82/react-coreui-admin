// import jwtDecode from "jwt-decode";
import http from "./httpService";
import { toast } from "react-toastify";

const apiEndpoint = http.server + "/login";
const tokenKey = "user_token";
const userKey = "current_user";

http.setToken(getToken());

export async function login(user) {
  console.log(user);
  localStorage.setItem(tokenKey, user.data.api_token);
  localStorage.setItem(userKey, JSON.stringify(user.data));
}

// export function loginWithJwt(jwt) {
//   localStorage.setItem(tokenKey, jwt);
// }

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(userKey));
}

export function getToken() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  getToken
};
