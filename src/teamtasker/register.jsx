import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import registerService from "../services/register-service";
import { toast } from "react-toastify";

class Register extends Component {
  state = {
    register: { name: "", email: "", password: "", password_confirmation: "" }
  };

  handleOnChange = ({ target: input }) => {
    const register = { ...this.state.register };
    const key = input["name"];
    register[key] = input.value;

    this.setState({ register });
  };

  handleOnRegister = async () => {
    try {
      const response = await registerService.register(this.state.register);
      console.log(response);
      toast.info("Great, you have registered");
      this.props.history.push("/login");
    } catch (err) {
      console.log(err);
      const { status, responseJSON, responseText } = err;
      if (status === 422) {
        if (responseJSON) {
          Object.keys(responseJSON).map(function(key, index) {
            const messages = responseJSON[key];
            messages.map(m => toast.error(`${key}: ${m}`));
          });
        } else {
          toast.error(responseText);
        }
      }
    }
  };

  render() {
    const { register } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        value={register.name}
                        name="name"
                        onChange={e => this.handleOnChange(e)}
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        value={register.email}
                        name="email"
                        onChange={e => this.handleOnChange(e)}
                        type="text"
                        placeholder="Email"
                        autoComplete="email"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        value={register.password}
                        name="password"
                        onChange={e => this.handleOnChange(e)}
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        value={register.password_confirmation}
                        name="password_confirmation"
                        onChange={e => this.handleOnChange(e)}
                        type="password"
                        placeholder="Repeat password"
                        autoComplete="new-password"
                      />
                    </InputGroup>
                    <Button
                      onClick={this.handleOnRegister}
                      color="success"
                      block
                    >
                      Create Account
                    </Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>Team Task Manager Solution by N-Media</Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
