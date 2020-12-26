import React, { useContext } from "react";
import Config from "./Config";
import Game from "./Game";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import { BrowserRouter, Route } from "react-router-dom";

import Context from "../state/Context";

const Home = (props) => {
  const { players } = useContext(Context);
  return (
    <Container fluid align="center">
      <h1>Home</h1>
      <p>This is a PingPong score board app</p>
      <p>
        Players are {players[0]} and {players[1]}
      </p>
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
      <Route
        exact
        path="/"
        render={() => {
          return <Home />;
        }}
      />
      <Route
        path="/game"
        render={() => {
          return <Game />;
        }}
      />
      <Route
        path="/config"
        render={() => {
          return <Config />;
        }}
      />
    </BrowserRouter>
  );
};

export default App;
