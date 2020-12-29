import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const ScoreButtons = (props) => {
  const { scoreChange, pSide } = props;
  const rendering = [
    <Col align="center">
      <Button
        variant="secondary"
        onClick={() => scoreChange(0, -1)}
        style={{ width: "50%" }}
      >
        <h3>-1</h3>
      </Button>
      <Button
        variant="secondary"
        onClick={() => scoreChange(0, 1)}
        style={{ width: "50%" }}
      >
        <h3>+1</h3>
      </Button>
    </Col>,
    <Col align="center">
      <Button
        variant="secondary"
        onClick={() => scoreChange(1, -1)}
        style={{ width: "50%" }}
      >
        <h3>-1</h3>
      </Button>
      <Button
        variant="secondary"
        onClick={() => scoreChange(1, 1)}
        style={{ width: "50%" }}
      >
        <h3>+1</h3>
      </Button>
    </Col>,
  ];
  return (
    <Row style={props.style}>
      {rendering[pSide[0]]}
      {rendering[pSide[1]]}
    </Row>
  );
};

export default ScoreButtons;
