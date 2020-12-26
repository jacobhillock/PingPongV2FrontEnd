import React, { useState } from "react";

import Context from "./Context";

const Provider = ({ children }) => {
  const [players, setPlayers] = useState(["Player 1", "Player 2"]);

  const value = {
    players,
    setPlayers,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
