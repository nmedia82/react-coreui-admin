import React from "react";
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
  InputGroupText
} from "reactstrap";

export default function AddNewTeam(props) {
  const {
    onAddNewTeam,
    onUpdateTeam,
    onCancelEditing,
    onNameChange,
    team,
    isEditing
  } = props;
  const formTitle = isEditing ? "Edit Team ID: " + team.id : "Add Team";
  const buttonLabel = isEditing ? "Update" : "Add";

  return (
    <Card>
      <CardHeader>{formTitle}</CardHeader>
      <CardBody>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="fa fa-users"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              onChange={e => onNameChange(e.target)}
              value={team.name}
              id="name"
              name="name"
              placeholder="Team Name"
              autoComplete=""
            />
          </InputGroup>
        </FormGroup>
        <FormGroup className="form-actions">
          <Button
            onClick={() =>
              isEditing ? onUpdateTeam(team) : onAddNewTeam(team)
            }
            size="sm"
            color="success"
          >
            {buttonLabel}
          </Button>
          {isEditing && (
            <Button onClick={() => onCancelEditing()} size="sm" color="info">
              Cancel
            </Button>
          )}
        </FormGroup>
      </CardBody>
    </Card>
  );
}
