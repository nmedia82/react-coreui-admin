import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import auth from "./../services/authService";
import registerService from "../services/register-service";
import { toast } from "react-toastify";

class Login extends Component {
  state = {
    login: { email: "", password: "" }
  };

  handleOnChange = ({ target: input }) => {
    const login = { ...this.state.login };
    const key = input["name"];
    login[key] = input.value;

    this.setState({ login });
  };

  handleLogin = async () => {
    try {
      const { email, password } = this.state.login;
      //   await auth.login(email, password);
      const { data: user } = await registerService.login(this.state.login);
      auth.login(user);
      //   this.props.history.push("/");
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
    const { login } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          value={login.email}
                          name="email"
                          onChange={e => this.handleOnChange(e)}
                          type="text"
                          placeholder="Email"
                          autoComplete="email"
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          value={login.password}
                          name="password"
                          onChange={e => this.handleOnChange(e)}
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            onClick={this.handleLogin}
                            color="primary"
                            className="px-4"
                          >
                            Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">
                            Forgot password?
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Create new account here.</p>
                      <Link to="/register">
                        <Button
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Register Now!
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
