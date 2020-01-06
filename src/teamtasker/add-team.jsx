import React from "react";
import {
  Col,
  Button,
  Card,
  CardBody,
  CardHeader,
  Label,
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
    categories,
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
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="category_id">Team Category</Label>
          </Col>
          <Col xs="12" md="9" size="">
            <Input
              value={team.category_id}
              onChange={e => onNameChange(e.target)}
              type="select"
              name="category_id"
              id="category_id"
              bsSize=""
            >
              <option value="0">Please select</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Input>
          </Col>
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
