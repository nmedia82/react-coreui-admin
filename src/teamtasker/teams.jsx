import React, { Component } from 'react'
import teamService from '../services/team-service';
import AddTeam from './add-team';
// import AddTeam2 from './add-team2';
import { toast } from 'react-toastify';
import SweetAlert from 'react-bootstrap-sweetalert';
import TeamList from './team-list';


export default class Teams extends Component {
    

    state = {
        teams:[],
        showAlert: null,
        currentTeam: {name: ''},
        isEditing: false,
    }

    async componentDidMount() {

        const teams = await teamService.getTeams();
        this.setState({teams});
    }

    handleAddNewTeam = async (data) => {
        const team = await teamService.addTeam( data );

        if( team ) {
            toast.info("Added successfully: " + team.name);
        }

        const teams = [team, ...this.state.teams];
        this.setState( { teams} );
    }

    confirmDelete = (team) => {
      const getAlert = () => (
        <SweetAlert 
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => this.handleDelete(team)}
        onCancel={() => this.setState({showAlert:null})}
        focusCancelBtn
        >
          Are you sure?
        </SweetAlert>
      );

      this.setState({
        showAlert: getAlert()
      });
    }

    handleDelete = async (team) => {
        const orgTeams = this.state.teams;
        const teams = this.state.teams.filter( t => t.id !== team.id );
        const showAlert = null;
        this.setState({teams, showAlert});

        try {
            await teamService.deleteTeam(team.id);
            toast.success("Team Remove Successfully: "+team.name);   
        } catch (err) {
            toast.error("Some error occurred while deleting data");
            this.setState({teams: orgTeams});
        }
        
    }

    handleSelect = function (currentTeam) {
      this.startEditing();
      this.setState({currentTeam});
    }

    startEditing = function(){
      const isEditing = true;
      this.setState({isEditing});
    }

    endEditing = () => {
      const currentTeam = {name: ''};
      const isEditing = false;
      this.setState({currentTeam, isEditing});
    }


    render() {

        const {teams, currentTeam, isEditing} = this.state;
        return (
            <div className="animated fadeIn">
            
            {this.state.showAlert}

            <AddTeam
            onAddNewTeam={this.handleAddNewTeam} 
            onCancelEditing={this.endEditing}
            team={currentTeam}
            isEditing={isEditing}
            />
                
            <TeamList teams={teams}
            onConfirmDelete={(team) => this.confirmDelete(team)}
            onSelect={(team) => this.handleSelect(team)}
            />
            </div>
        )
    }
}
