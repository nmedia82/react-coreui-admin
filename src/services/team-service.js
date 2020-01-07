import http from "./httpService";
import auth from "./authService";

http.setToken(auth.getToken());

export default {
  getCategories: async function() {
    return await http.get(http.server + "/team_categories");
  },

  getTeams: async function() {
    return await http.get(http.server + "/teams");
  },

  addTeam: async function(team) {
    return await http.post(http.server + "/teams", team);
  },

  updateTeam: async function(team) {
    return await http.put(http.server + "/teams/" + team.id, team);
  },

  deleteTeam: async function(id) {
    return await http.delete(http.server + "/teams/" + id);
  }
};
