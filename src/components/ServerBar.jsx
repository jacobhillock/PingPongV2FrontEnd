import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const WinButton = (props) => {
  const { scores, players, onWinner } = props;
  const plWinner = scores[0] > scores[1] ? 0 : 1;
  const func =
    typeof onWinner === "function" ? () => onWinner(plWinner) : () => {};
  const winner = (
    <button onClick={func}>
      <Col>
        <h2>{players[plWinner]} is the Winner!!!</h2>
      </Col>
    </button>
  );
  return <Col align="center">{winner}</Col>;
};

const Bar = (props) => {
  const { scores, wins, pSide } = props;
  const serveBar = (
    <div style={{ background: "#16f016" }}>
      <h5>Server</h5>
    </div>
  );
  const initialServer = (wins[0] + wins[1]) % 2;
  const server = (parseInt((scores[0] + scores[1]) / 2) + initialServer) % 2;
  const serverStatus = [
    server === 0 ? serveBar : <></>,
    server === 1 ? serveBar : <></>,
  ];
  return (
    <>
      <Col align="center">{serverStatus[pSide[0]]}</Col>
      <Col align="center">{serverStatus[pSide[1]]}</Col>
    </>
  );
};

const ServerBar = (props) => {
  const { players, scores, wins, pSide, onWinner } = props;
  let rendering;
  if (
    (scores[0] < 11 && scores[1] < 11) ||
    Math.abs(scores[0] - scores[1]) < 2
  ) {
    rendering = <Bar scores={scores} wins={wins} pSide={pSide} />;
  } else {
    rendering = (
      <WinButton players={players} scores={scores} onWinner={onWinner} />
    );
  }

  return <Row style={props.style}>{rendering}</Row>;
};

export default ServerBar;
