import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";

import ScoreBoard from "./ScoreBoard";
import ServerBar from "./ServerBar";

import { Route, useParams } from "react-router-dom";

const GET = (id) => {
  return axios.get(`/getInfo/${id}`).then((response) => {
    return response.data;
  });
};

const WatchRendering = () => {
  const { id } = useParams();
  const [players, setPlayers] = useState(["p1", "p2"]);
  const [wins, setWins] = useState([0, 0]);
  const [scores, setScores] = useState([0, 0]);
  const [pSide, setPSide] = useState([0, 1]);

  useEffect(() => {
    GET(id).then((data) => {
      setPlayers(data.players || ["none", "loaded"]);
      setWins(data.wins || [0, 0]);
      setScores(data.scores || [0, 0]);
      setPSide(data.pSide || [0, 1]);
    });
  }, [id]);

  return (
    <>
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
      />
    </>
  );
};

const Watch = ({ match }) => {
  return (
    <Container fluid>
      <Route
        path={`${match.path}/:id`}
        render={() => {
          return <WatchRendering />;
        }}
      />
      <Route
        exact
        path={match.path}
        render={() => {
          return <h3>Please enter a game ID in the url above</h3>;
        }}
      />
    </Container>
  );
};

export default Watch;
