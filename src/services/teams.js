import http from './httpServicejQuery';

export default {

    getTeams: async function() {

        const teams = await http.get(http.server+"/teams");
        // console.log(teams);
        return teams;
    }
}
