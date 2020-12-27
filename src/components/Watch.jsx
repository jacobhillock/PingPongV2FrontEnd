import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Context from "../state/Context";

import { Route } from "react-router-dom";

const WatchRendering = (id) => {
  const { players } = useContext(Context);
  const { scores } = useContext(Context);
  const { wins } = useContext(Context);
  const { switchSides } = useContext(Context);

  const getPlayerSide = (pl) => {
    const games = wins[0] + wins[1];
    const swop =
      games % 4 === 1 || (games % 4 === 2 && switchSides === 1) ? 1 : 0;
    return (pl + swop) % 2;
  };
  const renderPlayers = () => {
    return (
      <>
        <Col align="center">
          <h1>
            {players[getPlayerSide(0)]}'s wins: {wins[getPlayerSide(0)]}
          </h1>
        </Col>
        <Col align="center">
          <h1>
            {players[getPlayerSide(1)]}'s wins: {wins[getPlayerSide(1)]}
          </h1>
        </Col>
      </>
    );
  };
  const renderScores = () => {
    return (
      <>
        <Col align="center">
          <h2>Score: {scores[getPlayerSide(0)]}</h2>
        </Col>
        <Col align="center">
          <h2>Score: {scores[getPlayerSide(1)]}</h2>
        </Col>
      </>
    );
  };
  const renderBarWinner = () => {
    if (
      (scores[0] < 11 && scores[1] < 11) ||
      Math.abs(scores[0] - scores[1]) < 2
    ) {
      // Default display which shows current server
      const initialServer = (wins[0] + wins[1]) % 2;
      const server =
        (parseInt((scores[0] + scores[1]) / 2) + initialServer) % 2;
      const serveBar = (
        <div style={{ background: "#16f016" }}>
          <h5>Server</h5>
        </div>
      );
      const serverStatus = [
        server === 0 ? serveBar : <></>,
        server === 1 ? serveBar : <></>,
      ];
      return (
        <>
          <Col align="center">{serverStatus[getPlayerSide(0)]}</Col>
          <Col align="center">{serverStatus[getPlayerSide(1)]}</Col>
        </>
      );
    } else {
      // Winner display
      const plWinner =
        scores[getPlayerSide(0)] > scores[getPlayerSide(1)] ? 0 : 1;
      const winner = (
        <button>
          <Col>
            <h2>{players[plWinner]} is the Winner!!!</h2>
          </Col>
        </button>
      );
      return <Col align="center">{winner}</Col>;
    }
  };

  const playersRendering = renderPlayers();
  const scoresRendering = renderScores();
  const barRendering = renderBarWinner();
  return (
    <>
      <Row style={{ marginTop: "3%" }}>{playersRendering}</Row>
      <Row style={{ marginTop: "2%" }}>{scoresRendering}</Row>
      <Row style={{ marginTop: "2%" }}>{barRendering}</Row>
    </>
  );
};

const Watch = ({ match }) => {
  return (
    <Container fluid>
      <Route path={`${match.path}/:id`} component={WatchRendering} />
      <Route
        exact
        path={match.path}
        render={() => {
          return <h3>Please enter a game ID in the url above</h3>;
        }}
      />
    </Container>
  );
};

export default Watch;
