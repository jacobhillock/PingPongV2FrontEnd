import React, { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Context from "../state/Context";

const Game = () => {
  const [number, setNumber] = useState(null);

  const { scores, setScores } = useContext(Context);
  const { players } = useContext(Context);
  const { wins, setWins } = useContext(Context);
  const { switchSides } = useContext(Context);
  const { id, setID } = useContext(Context);
  const { useId, setUseID } = useContext(Context);
  const { url } = useContext(Context);

  useEffect(() => {
    // console.log("set scores effect", wins);
    sessionStorage.setItem("scores", JSON.stringify(scores));
  }, [scores]);
  useEffect(() => {
    // console.log("set wins effect", wins);
    sessionStorage.setItem("wins", JSON.stringify(wins));
  }, [wins]);
  useEffect(() => {
    // console.log("set wins effect", wins);
    sessionStorage.setItem("id", JSON.stringify(id));
  }, [id]);
  useEffect(() => {
    // console.log("set wins effect", wins);
    sessionStorage.setItem("useId", JSON.stringify(useId));
  }, [useId]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  const handleKeyPress = (event) => {
    // Set the player to increase/decrease
    if (event.keyCode === 49) {
      setNumber(getPlayerSide(0));
    } else if (event.keyCode === 50) {
      setNumber(getPlayerSide(1));
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
    win[(winner + 1) % 2] = wins[(winner + 1) % 2];
    setWins(win);
    setScores([0, 0]);
    setNumber(null);
  };
  const scoreChange = (player, delta) => {
    var score = [];
    score[player] = scores[player] + delta;
    score[(player + 1) % 2] = scores[(player + 1) % 2];

    setScores(score);
  };
  const getPlayerSide = (pl) => {
    const games = wins[0] + wins[1];
    const swop =
      (games % 4 === 1 || games % 4 === 2) && switchSides === 1 ? 1 : 0;
    return (pl + swop) % 2;
  };
  const renderPlayers = (pSide) => {
    const rendering = [
      <Col align="center">
        <h1>
          {players[0]}'s wins: {wins[0]}
        </h1>
      </Col>,
      <Col align="center">
        <h1>
          {players[1]}'s wins: {wins[1]}
        </h1>
      </Col>,
    ];
    return (
      <>
        {rendering[pSide[0]]}
        {rendering[pSide[1]]}
      </>
    );
  };
  const renderScores = (pSide) => {
    const rendering = [
      <Col align="center">
        <h2>Score: {scores[0]}</h2>
      </Col>,
      <Col align="center">
        <h2>Score: {scores[1]}</h2>
      </Col>,
    ];
    return (
      <>
        {rendering[pSide[0]]}
        {rendering[pSide[1]]}
      </>
    );
  };
  const renderBarWinner = (pSide) => {
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
          <Col align="center">{serverStatus[pSide[0]]}</Col>
          <Col align="center">{serverStatus[pSide[1]]}</Col>
        </>
      );
    } else {
      // Winner display
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
  const renderMouseScore = (pSide) => {
    const rendering = [
      <Col align="center">
        <button onClick={() => scoreChange(0, -1)} style={{ width: "50%" }}>
          <h3>-1</h3>
        </button>
        <button onClick={() => scoreChange(0, 1)} style={{ width: "50%" }}>
          <h3>+1</h3>
        </button>
      </Col>,
      <Col align="center">
        <button onClick={() => scoreChange(1, -1)} style={{ width: "50%" }}>
          <h3>-1</h3>
        </button>
        <button onClick={() => scoreChange(1, 1)} style={{ width: "50%" }}>
          <h3>+1</h3>
        </button>
      </Col>,
    ];
    return (
      <>
        {rendering[pSide[0]]}
        {rendering[pSide[1]]}
      </>
    );
  };
  const activateWatch = () => {
    setUseID(1);
    setID(123);
  };
  const renderWatchNow = () => {
    if (useId === 1) {
      const link = `${url}watch/${id}`;
      return (
        <Col align="center">
          <a href={link}>
            <p>Click here to see the watch link</p>
          </a>
          <p>Or share the watch link: {link}</p>
        </Col>
      );
    } else {
      return (
        <Col align="center">
          <Button variant="primary" onClick={activateWatch}>
            Click here to enable this game to be watched
          </Button>
        </Col>
      );
    }
  };

  const pSide = [getPlayerSide(0), getPlayerSide(1)];
  const playersRendering = renderPlayers(pSide);
  const scoresRendering = renderScores(pSide);
  const barRendering = renderBarWinner(pSide);
  const manualScoreRendering = renderMouseScore(pSide);
  const watchNowRendering = renderWatchNow();
  return (
    <Container fluid>
      <Row style={{ marginTop: "3%" }}>{playersRendering}</Row>
      <Row style={{ marginTop: "2%" }}>{scoresRendering}</Row>
      <Row style={{ marginTop: "2%" }}>{barRendering}</Row>
      <Row style={{ marginTop: "3%" }}>{manualScoreRendering}</Row>
      <Row style={{ marginTop: "3%" }}>{watchNowRendering}</Row>
    </Container>
  );
};

export default Game;
