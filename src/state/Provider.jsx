import React, { useState } from "react";

import Context from "./Context";

const Provider = ({ children }) => {
  // Player state
  const [players, setPlayers] = useState(
    localStorage.getItem("players") === null
      ? [0, 0]
      : JSON.parse(localStorage.getItem("players"))
  );
  // Score state
  const [scores, setScores] = useState(
    sessionStorage.getItem("scores") === null
      ? [0, 0]
      : JSON.parse(sessionStorage.getItem("scores"))
  );
  // Win state
  const [wins, setWins] = useState(
    sessionStorage.getItem("wins") === null
      ? [0, 0]
      : JSON.parse(sessionStorage.getItem("wins"))
  );

  // Initial Server state
  const [initialServer, setInitialServer] = useState(
    JSON.parse(sessionStorage.getItem("initialServer")) || 0
  );
  const [switchSides, setSwitchSides] = useState(0);
  const [darkMode, setDarkMode] = useState(0);

  const value = {
    players,
    setPlayers,
    scores,
    setScores,
    wins,
    setWins,
    initialServer,
    setInitialServer,
    switchSides,
    setSwitchSides,
    darkMode,
    setDarkMode,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
