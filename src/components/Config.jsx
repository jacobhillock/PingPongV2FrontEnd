import React, { Component, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

export default class Config extends Component {
  constructor(props) {
    super(props);

    this.submitChanges = this.submitChanges.bind(this);
  }
  submitChanges(event) {
    const { setPlayers } = useContext(Context);
    setPlayers([event.target.pl1.value, event.target.pl2.value]);

    this.props.onConfig(false, false);
  }
  render() {
    const { players } = useContext(Context);
    return (
      <Container fluid align="center">
        <h1>Config</h1>
        <Form onSubmit={this.submitChanges}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Player 1 Name</Form.Label>
              <Form.Control
                className="mb-2"
                id="pl1"
                defaultValue={players[0]}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Player 2 Name</Form.Label>
              <Form.Control
                className="mb-2"
                id="pl2"
                defaultValue={players[1]}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="switch">
              <Form.Check
                type="checkbox"
                label="Do Player Switch"
                id="switch"
                disabled
              />
              <Form.Check
                type="checkbox"
                label="Dark Mode"
                id="dark"
                disabled
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form.Row>
        </Form>
      </Container>
    );
  }
}
