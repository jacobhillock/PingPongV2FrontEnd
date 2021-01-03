import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Context from "../state/Context";

const Config = () => {
  const { players, setPlayers } = useContext(Context);
  const { switchSides, setSwitchSides } = useContext(Context);
  const { darkMode, setDarkMode } = useContext(Context);
  // const { sevenSeg, setSevenSeg } = useContext(Context);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);
  useEffect(() => {
    localStorage.setItem("switchSides", JSON.stringify(switchSides));
  }, [switchSides]);
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);
  // useEffect(() => {
  //   localStorage.setItem("sevenSeg", JSON.stringify(sevenSeg));
  // }, [sevenSeg]);

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
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form.Row>
      </Form>
      <Row>
        <Button
          variant="primary"
          onClick={() => setSwitchSides(Math.abs(switchSides - 1))}
        >
          Toggle Switch Sides, Currently: {switchSides === 0 ? "Off" : "On"}
        </Button>
      </Row>
      <Row>
        <Button
          variant="primary"
          onClick={() => setDarkMode(Math.abs(darkMode - 1))}
          disabled
        >
          Toggle Dark Mode, Currently: {darkMode === 0 ? "Off" : "On"}
        </Button>
      </Row>
      {/* <Row>
        <Button
          variant="primary"
          onClick={() => setSevenSeg(Math.abs(sevenSeg - 1))}
          disabled
        >
          Toggle Seven Segment, Currently: {sevenSeg === 0 ? "Off" : "On"}
        </Button>
      </Row> */}
    </Container>
  );
};

export default Config;
