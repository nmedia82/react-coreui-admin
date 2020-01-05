import React, { Component } from 'react'
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardHeader,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
  } from 'reactstrap';

export default class AddTeam extends Component {

    state = {
        data: {name: ''},
    }

    handleChangeName = (e) => {
        const data = {name: e.target.value};

        this.setState( {data} );
    }

    
    render() {

        const {onAddNewTeam, onUpdateTeam, onCancelEditing, team, isEditing} = this.props;
        const {data} = this.state;
        const formTitle = isEditing ? "Edit Team ID: "+team.id : "Add Team";
        const buttonLabel = isEditing ? "Update" : "Add";
        const teamName = isEditing ? team.name : data.name;
        console.log(teamName);

        return (
            <div>
                <Card>
              <CardHeader>
                {formTitle}
              </CardHeader>
              <CardBody>
                <Form action="" method="post">
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-users"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" onChange={this.handleChangeName} 
                      value={teamName}
                      id="team_name" name="team_name" placeholder="Team Name" 
                      autoComplete=""/>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="form-actions">
                    <Button onClick={() => isEditing ? onUpdateTeam(data) : onAddNewTeam(data)} size="sm" 
                    color="success">{buttonLabel}</Button>
                    {isEditing && <Button onClick={() => onCancelEditing()} size="sm" color="info">Cancel</Button>}
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
            </div>
        )
    }
}
