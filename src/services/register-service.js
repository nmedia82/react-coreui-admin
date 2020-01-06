import http from "./httpServicejQuery";

export default {
  register: async function(user) {
    return await http.post(http.server + "/register", user);
  }
};
