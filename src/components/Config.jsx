import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Context from "../state/Context";

const Config = () => {
  const { players, setPlayers } = useContext(Context);
  // const { switchSides, setSwitchSides } = useContext(Context);
  // const { darkMode, setDarkMode } = useContext(Context);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPlayers([event.target.pl1.value, event.target.pl2.value]);

    // this.props.onConfig(false, false);
  };
  return (
    <Container fluid align="center">
      <h1>Config</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Player 1 Name</Form.Label>
            <Form.Control className="mb-2" id="pl1" defaultValue={players[0]} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Player 2 Name</Form.Label>
            <Form.Control className="mb-2" id="pl2" defaultValue={players[1]} />
          </Form.Group>
          <Form.Group as={Col} controlId="switch">
            <Form.Check
              type="checkbox"
              label="Do Player Switch"
              id="switch"
              disabled
            />
            <Form.Check type="checkbox" label="Dark Mode" id="dark" disabled />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form.Row>
      </Form>
    </Container>
  );
};

export default Config;
