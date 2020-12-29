import React, { useContext, useEffect } from "react";
import Config from "./Config";
import Game from "./Game";
import Watch from "./Watch";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import { BrowserRouter, Route } from "react-router-dom";

import Context from "../state/Context";

const Home = () => {
  const { players } = useContext(Context);
  const { scores, setScores } = useContext(Context);
  const { wins, setWins } = useContext(Context);

  useEffect(() => {
    // console.log("set scores effect", wins);
    sessionStorage.setItem("scores", JSON.stringify(scores));
  }, [scores]);
  useEffect(() => {
    // console.log("set wins effect", wins);
    sessionStorage.setItem("wins", JSON.stringify(wins));
  }, [wins]);

  return (
    <Container fluid align="center">
      <h1>Home</h1>
      <p>This is a PingPong score board app</p>
      <p>
        Players are {players[0]} and {players[1]}
      </p>
      <br />
      <button onClick={() => setScores([0, 0])} styles={{ width: "20%" }}>
        Reset Scores
      </button>
      <button onClick={() => setWins([0, 0])} styles={{ width: "20%" }}>
        Reset Wins
      </button>
    </Container>
  );
};

const AppNav = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto">
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/game">Game</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/watch">Watch</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/config">Config</Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppNav />
      <Route exact path="/" component={Home} />
      <Route
        path="/upload/:id"
        render={(props) => {
          const { id } = props.match.params;
          return <h2>Game id: {id}</h2>;
        }}
      />
      <Route path="/game" component={Game} />
      <Route path="/watch" component={Watch} />
      <Route path="/config" component={Config} />
    </BrowserRouter>
  );
};

export default App;
