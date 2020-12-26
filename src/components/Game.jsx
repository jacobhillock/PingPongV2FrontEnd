import React, { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Context from "../state/Context";

const Game = () => {
  const [number, setNumber] = useState(null);

  const { players } = useContext(Context);
  const { scores, setScores } = useContext(Context);
  const { wins, setWins } = useContext(Context);
  const { initialServer, setInitialServer } = useContext(Context);

  useEffect(() => {
    // console.log("set score effect", scores);
    localStorage.setItem("scores", JSON.stringify(scores));
  }, [scores]);
  useEffect(() => {
    console.log("set wins effect", wins);
    sessionStorage.setItem("wins", JSON.stringify(wins));
  }, [wins]);
  useEffect(() => {
    console.log("set initialServers effect", initialServer);
    sessionStorage.setItem("initialServer", JSON.stringify(initialServer));
  }, [initialServer]);

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
    var score = scores;
    if (number != null && (event.keyCode === 38 || event.keyCode === 187)) {
      score[number]++;

      setScores(score);
      setNumber(null);
    } else if (
      number != null &&
      (event.keyCode === 40 || event.keyCode === 189)
    ) {
      score[number]--;

      setScores(score);
      setNumber(null);
    }
  };
  const setWinner = (winner) => {
    var win = wins;
    win[winner]++;
    setWins(win);
    setScores([0, 0]);
    setInitialServer((initialServer + 1) % 2);
    setNumber(null);
  };
  const renderBarWinner = () => {
    if (
      (scores[0] < 11 && scores[1] < 11) ||
      Math.abs(scores[0] - scores[1]) < 2
    ) {
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
      const plWinner = scores[0] > scores[1] ? 0 : 1;
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
  const bar = renderBarWinner();
  return (
    <Container fluid>
      <Row>
        <Col align="center">
          <h1>
            {players[0]}'s wins: {wins[0]}
          </h1>
          <h3>Score: {scores[0]}</h3>
        </Col>
        <Col align="center">
          <h1>
            {players[1]}'s wins: {wins[1]}
          </h1>
          <h3>Score: {scores[1]}</h3>
        </Col>
      </Row>
      <Row>{bar}</Row>
    </Container>
  );
};

export default Game;
