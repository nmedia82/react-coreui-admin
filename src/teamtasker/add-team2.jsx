import React from 'react'
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

export default function AddNewTeam(props) {

    const {onNameChange, onAddNewTeam, team} = props;

    return (
        <Card>
              <CardHeader>
                Example Form
              </CardHeader>
              <CardBody>
                <Form action="" method="post">
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-users"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" 
                      onChange={(e) => onNameChange(e.target.value)} 
                      value={team.name}
                      id="team_name" name="team_name" placeholder="Team Name" 
                      autoComplete=""/>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="form-actions">
                    <Button onClick={() => onAddNewTeam(team)} size="sm" color="success">Add</Button>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
    )
}
