import React, { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Context from "../state/Context";

const Game = () => {
  const [number, setNumber] = useState(null);
  const [scores, setScores] = useState([0, 0]);

  const { players } = useContext(Context);
  const { wins, setWins } = useContext(Context);
  const { switchSides } = useContext(Context);

  useEffect(() => {
    // console.log("set wins effect", wins);
    sessionStorage.setItem("wins", JSON.stringify(wins));
  }, [wins]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  const handleKeyPress = (event) => {
    // Set the player to increase/decrease
    if (event.keyCode === 49) {
      setNumber(0);
    } else if (event.keyCode === 50) {
      setNumber(1);
    }

    // Increase/Decrease set player

    if (number != null && (event.keyCode === 38 || event.keyCode === 187)) {
      scoreChange(number, 1);

      setNumber(null);
    } else if (
      number != null &&
      (event.keyCode === 40 || event.keyCode === 189)
    ) {
      scoreChange(number, -1);
      setNumber(null);
    }
  };
  const setWinner = (winner) => {
    var win = [];
    win[winner] = wins[winner] + 1;
    win[Math.abs(winner - 1)] = wins[Math.abs(winner - 1)];
    setWins(win);
    setScores([0, 0]);
    setNumber(null);
  };
  const scoreChange = (player, delta) => {
    var score = [];
    score[player] = scores[player] + delta;
    score[Math.abs(player - 1)] = scores[Math.abs(player - 1)];

    setScores(score);
  };
  const getPlayerSide = (pl) => {
    return (pl + switchSides) % 2;
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
          <Col align="center">{serverStatus[0]}</Col>
          <Col align="center">{serverStatus[1]}</Col>
        </>
      );
    } else {
      // Winner display
      const plWinner =
        scores[getPlayerSide(0)] > scores[getPlayerSide(1)] ? 0 : 1;
      const winner = (
        <button onClick={() => setWinner(plWinner)}>
          <Col>
            <h2>{players[plWinner]} is the Winner!!!</h2>
          </Col>
        </button>
      );
      return <Col align="center">{winner}</Col>;
    }
  };
  const renderMouseScore = () => {
    return (
      <>
        <Col align="center">
          <button
            onClick={() => scoreChange(getPlayerSide(0), -1)}
            style={{ width: "50%" }}
          >
            <h3>-1</h3>
          </button>
          <button
            onClick={() => scoreChange(getPlayerSide(0), 1)}
            style={{ width: "50%" }}
          >
            <h3>+1</h3>
          </button>
        </Col>
        <Col align="center">
          <button
            onClick={() => scoreChange(getPlayerSide(1), -1)}
            style={{ width: "50%" }}
          >
            <h3>-1</h3>
          </button>
          <button
            onClick={() => scoreChange(getPlayerSide(1), 1)}
            style={{ width: "50%" }}
          >
            <h3>+1</h3>
          </button>
        </Col>
      </>
    );
  };
  const playersRendering = renderPlayers();
  const scoresRendering = renderScores();
  const barRendering = renderBarWinner();
  const manualScoreRendering = renderMouseScore();
  return (
    <Container fluid>
      <Row style={{ marginTop: "3%" }}>{playersRendering}</Row>
      <Row style={{ marginTop: "2%" }}>{scoresRendering}</Row>
      <Row style={{ marginTop: "2%" }}>{barRendering}</Row>
      <Row style={{ marginTop: "3%" }}>{manualScoreRendering}</Row>
    </Container>
  );
};

export default Game;
