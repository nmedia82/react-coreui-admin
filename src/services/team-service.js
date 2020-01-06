import http from "./httpServicejQuery";

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

  deleteTeam: async function(id) {
    return await http.post(http.server + "/teams/" + id);
  },

  updateTeam: async function(team) {
    return await http.post(http.server + "/update/teams/" + team.id, team);
  }
};
