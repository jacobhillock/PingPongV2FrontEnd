import React, { useState } from "react";

import Context from "./Context";

const Provider = ({ children }) => {
  // Player state
  const [players, setPlayers] = useState(
    localStorage.getItem("players") === null
      ? ["Player 1", "Player 2"]
      : JSON.parse(localStorage.getItem("players"))
  );
  // Win state
  const [wins, setWins] = useState(
    sessionStorage.getItem("wins") === null
      ? [0, 0]
      : JSON.parse(sessionStorage.getItem("wins"))
  );
  // Score state
  const [scores, setScores] = useState(
    sessionStorage.getItem("scores") === null
      ? [0, 0]
      : JSON.parse(sessionStorage.getItem("scores"))
  );

  const [switchSides, setSwitchSides] = useState(
    localStorage.getItem("switchSides") === null
      ? 0
      : JSON.parse(localStorage.getItem("switchSides"))
  );
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("switchSides") === null
      ? 0
      : JSON.parse(localStorage.getItem("switchSides"))
  );
  const [id, setID] = useState(null);

  const value = {
    players,
    setPlayers,
    wins,
    setWins,
    scores,
    setScores,
    switchSides,
    setSwitchSides,
    darkMode,
    setDarkMode,
    id,
    setID,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
