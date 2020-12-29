import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const PlayerRenderer = (props) => {
  return (
    <Col align="center">
      <h1>
        {props.player}'s wins: {props.win}
      </h1>
    </Col>
  );
};
const ScoreRenderer = (props) => {
  return (
    <Col align="center">
      <h2>Score: {props.score}</h2>
    </Col>
  );
};

const ScoreBoard = (props) => {
  const { players, pSide, scores, wins } = props;
  return (
    <>
      <Row style={props.style}>
        <PlayerRenderer player={players[pSide[0]]} win={wins[[pSide[0]]]} />
        <PlayerRenderer player={players[pSide[1]]} win={wins[[pSide[1]]]} />
      </Row>
      <Row style={props.style}>
        <ScoreRenderer score={scores[pSide[0]]} />
        <ScoreRenderer score={scores[pSide[1]]} />
      </Row>
    </>
  );
};

export default ScoreBoard;
