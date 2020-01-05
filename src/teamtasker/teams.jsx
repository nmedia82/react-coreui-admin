import React, { Component } from 'react'
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import team from './../services/teams';


export default class Teams extends Component {

    state = {
        teams:[],
    }
    async componentDidMount() {

        const teams = await team.getTeams();

        console.log(teams);

        this.setState({teams});
    }

    render() {

        const {teams} = this.state;
        return (
            <div className="animated fadeIn">
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
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                      {teams.map( team => (
                        <tr>
                        <td>{team.id}</td>
                        <td>{team.name}</td>
                        <td>
                        <Badge color="success">Active</Badge>
                        </td>
                        </tr>
                      ))}
                  
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
            </div>
        )
    }
}
