import React, { Component } from "react";
import teamService from "../services/team-service";
import AddTeam from "./add-team";
import { toast } from "react-toastify";
import SweetAlert from "react-bootstrap-sweetalert";
import TeamList from "./team-list";

export default class Teams extends Component {
  state = {
    teams: [], // contains all teams
    categories: [],
    showAlert: null, // show sweetalert notification
    currentTeam: { name: "" }, // hold current team for update
    dbSchema: { name: "", category_id: "" }, // fillable DB fields for resetting
    isEditing: false // Update mode
  };

  async componentDidMount() {
    const { data: teams } = await teamService.getTeams();
    const { data: categories } = await teamService.getCategories();
    this.setState({ teams, categories });
  }

  handleAddNewTeam = async data => {
    const {data: team} = await teamService.addTeam(data);
    
    if (team) {
      toast.info("Added successfully: " + team.name);
    }
    const teams = [team, ...this.state.teams];
    this.resetForm();
    this.setState({ teams });
  };

  handleUpdateTeam = async team => {
    const response = await teamService.updateTeam(team);

    if (!response) return toast.error("Error while updating ... try again");
    // Need to get exact item from array
    const teamDB = this.state.teams.find(t => t.id === team.id);
    const teams = [...this.state.teams];
    // Now getting the index using above item found
    const index = teams.indexOf(teamDB);
    teams[index] = { ...team };
    this.setState({ teams });
    this.resetForm();
    toast.success("Team updated successfully !!");
  };

  confirmDelete = team => {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => this.handleDelete(team)}
        onCancel={() => this.setState({ showAlert: null })}
        focusCancelBtn
      >
        Are you sure?
      </SweetAlert>
    );

    this.setState({
      showAlert: getAlert()
    });
  };

  handleDelete = async team => {
    const orgTeams = this.state.teams;
    const teams = this.state.teams.filter(t => t.id !== team.id);
    const showAlert = null;
    this.setState({ teams, showAlert });

    try {
      await teamService.deleteTeam(team.id);
      toast.success("Team Remove Successfully: " + team.name);
    } catch (err) {
      toast.error("Some error occurred while deleting data");
      this.setState({ teams: orgTeams });
    }
  };

  handleSelect = function(currentTeam) {
    // console.log("Selected", currentTeam);
    this.startEditing();
    this.setState({ currentTeam });
  };

  startEditing = function() {
    const isEditing = true;
    this.setState({ isEditing });
  };

  resetForm = () => {
    const currentTeam = { ...this.state.dbSchema };
    const isEditing = false;
    this.setState({ currentTeam, isEditing });
  };

  handleFormChange = input => {
    const currentTeam = { ...this.state.currentTeam };
    const key = input["name"];
    currentTeam[key] = input.value;
    console.log("currentTeam", currentTeam);

    this.setState({ currentTeam });
  };

  render() {
    const { teams, currentTeam, isEditing, categories } = this.state;
    return (
      <div className="animated fadeIn">
        {this.state.showAlert}

        <AddTeam
          onAddNewTeam={this.handleAddNewTeam}
          onUpdateTeam={this.handleUpdateTeam}
          onCancelEditing={this.resetForm}
          onNameChange={this.handleFormChange}
          categories={categories}
          team={currentTeam}
          isEditing={isEditing}
        />

        <TeamList
          teams={teams}
          categories={categories}
          onConfirmDelete={team => this.confirmDelete(team)}
          onSelect={team => this.handleSelect(team)}
        />
      </div>
    );
  }
}
