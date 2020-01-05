import http from './httpServicejQuery';

export default {

    getTeams: async function() {

        return await http.get(http.server+"/teams");
    },

    addTeam: async function (team) {

        return await http.post(http.server+"/teams", team);
    },

    deleteTeam: async function (id) {
        return await http.post(http.server+"/teams/"+id);
    },
    

}
