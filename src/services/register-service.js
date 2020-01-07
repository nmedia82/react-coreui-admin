import http from "./httpService";

export default {
  register: async function(user) {
    return await http.post(http.server + "/register", user);
  },

  login: async function(login) {
    return await http.post(http.server + "/login", login);
  }
};
