import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  ListGroupItemHeading
} from "reactstrap";

export default function TeamList(props) {
  const { teams, categories, onConfirmDelete, onSelect } = props;

  return (
    <Card>
      <CardHeader>
        <i className="fa fa-align-justify"></i> Striped Table
      </CardHeader>
      <CardBody>
        <Table responsive striped>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.map(team => (
              <tr key={team.id}>
                <td>{team.id}</td>
                <td>{team.name}</td>
                <td>
                  {categories.map(
                    cat => cat.id === parseInt(team.category_id) && cat.name
                  )}
                </td>
                <td>
                  <Button onClick={() => onConfirmDelete(team)} color="danger">
                    <span className="fa fa-remove"></span>
                  </Button>
                  <Button onClick={() => onSelect(team)} color="info">
                    <span className="fa fa-pencil"></span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination>
          <PaginationItem disabled>
            <PaginationLink previous tag="button">
              Prev
            </PaginationLink>
          </PaginationItem>
          <PaginationItem active>
            <PaginationLink tag="button">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink tag="button">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink tag="button">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink tag="button">4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink next tag="button">
              Next
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </CardBody>
    </Card>
  );
}
