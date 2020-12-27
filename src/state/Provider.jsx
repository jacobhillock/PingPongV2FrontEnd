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

  const [switchSides, setSwitchSides] = useState(0);
  const [darkMode, setDarkMode] = useState(0);

  const value = {
    players,
    setPlayers,
    wins,
    setWins,
    switchSides,
    setSwitchSides,
    darkMode,
    setDarkMode,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
