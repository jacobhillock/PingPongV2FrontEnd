import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Context from "../state/Context";

import ScoreBoard from "./ScoreBoard";
import ServerBar from "./ServerBar";
import WatchNow from "./WatchNow";
import ScoreButtons from "./ScoreButtons";

const POST = async (data) => {
  await axios.post("/upload", data).then(function (response) {
    console.log(response);
  });
};

const Game = () => {
  const [number, setNumber] = useState(null);

  const { scores, setScores } = useContext(Context);
  const { players } = useContext(Context);
  const { wins, setWins } = useContext(Context);
  const { switchSides } = useContext(Context);
  const { id, setID } = useContext(Context);
  const { url } = useContext(Context);

  useEffect(() => {
    // console.log("set scores effect", wins);
    sessionStorage.setItem("scores", JSON.stringify(scores));
  }, [scores]);
  useEffect(() => {
    // console.log("set wins effect", wins);
    sessionStorage.setItem("wins", JSON.stringify(wins));
  }, [wins]);
  const getPlayerSide = (pl, win) => {
    const gameWins = win !== null ? win : wins;
    const games = gameWins[0] + gameWins[1];
    const swop =
      (games % 4 === 1 || games % 4 === 2) && switchSides === 1 ? 1 : 0;
    return (pl + swop) % 2;
  };
  useEffect(() => {
    // console.log("set id effect", id);
    if (id !== null)
      POST({
        id,
        players: JSON.parse(localStorage.getItem("players")) || [
          "Player 1",
          "Player 2",
        ],
        wins: [0, 0],
        scores: [0, 0],
        pSide: [getPlayerSide(0, null), getPlayerSide(1, null)],
      });
    sessionStorage.setItem("id", JSON.stringify(id));
  }, [id]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  const handleKeyPress = (event) => {
    // Set the player to increase/decrease
    if (event.keyCode === 49) {
      setNumber(getPlayerSide(0, null));
    } else if (event.keyCode === 50) {
      setNumber(getPlayerSide(1, null));
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
    POST({
      id,
      players,
      wins: win,
      scores: [0, 0],
      pSide: [getPlayerSide(0, win), getPlayerSide(1, win)],
    });
  };
  const scoreChange = (player, delta) => {
    var score = [];
    score[player] = scores[player] + delta;
    score[(player + 1) % 2] = scores[(player + 1) % 2];

    if ((score[0] + score[1]) % 2 === 0 && id !== null) {
      POST({
        id,
        players,
        wins,
        scores: score,
        pSide: [getPlayerSide(0, null), getPlayerSide(1, null)],
      });
    }
    setScores(score);
  };

  const pSide = [getPlayerSide(0, null), getPlayerSide(1, null)];
  return (
    <Container fluid>
      <ScoreBoard
        style={{ marginTop: "3%" }}
        players={players}
        wins={wins}
        scores={scores}
        pSide={pSide}
      />
      <ServerBar
        style={{ marginTop: "3%" }}
        players={players}
        scores={scores}
        wins={wins}
        pSide={pSide}
        onWinner={setWinner}
      />
      <ScoreButtons
        style={{ marginTop: "3%" }}
        scoreChange={scoreChange}
        pSide={pSide}
      />
      <WatchNow style={{ marginTop: "3%" }} id={id} url={url} setID={setID} />
    </Container>
  );
};

export default Game;
