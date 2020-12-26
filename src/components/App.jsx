import React, { Component } from "react"
import Config from './Config'
import Game from './Game'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

import {
  BrowserRouter,
  Route,
} from 'react-router-dom'

function Home (props) {
  return (
    <Container fluid align="center">
      <h1>Home</h1>
      <p>This is a PingPong score board app</p>
    </Container>
  )
}

function AppNav () {
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
  )
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      players: ['Player 1', 'Player 2'],
      wins: [0, 0],
      score: [0, 0],
      initialServer: 0,
      server: 0,
      switchSides: false,
      darkMode: false,
    }
    this.handlePointChange = this.handlePointChange.bind(this)
    this.handleWinner = this.handleWinner.bind(this)
    this.handleConfig = this.handleConfig.bind(this)
  }
  handlePointChange(score){
    this.setState((currentState) => ({
      score,
      server: (Math.floor((score[0] + score[1])/2) + currentState.initialServer)%2
    }))
  }
  handleWinner (wins) {
    this.setState((currentState) => ({
      score: [0, 0],
      initialServer: (currentState.initialServer + 1) % 2,
      server: (currentState.initialServer + 1) % 2,
      wins,
    }))
  }
  handleConfig (p1, p2, switchSides, darkMode) {
    this.setState({
      players: [p1, p2],
      switchSides,
      darkMode,
    })
  }
  render () {
    return (
      <BrowserRouter>
        <AppNav />
        <Route exact path='/' render={() => {
          return (
            <Home />
          )
        }} />
        <Route path='/game' render={() => {
          return (
            <Game 
              players={this.state.players}
              wins={this.state.wins}
              score={this.state.score}
              server={this.state.server}
              onPointChange={this.handlePointChange}
              onWinner={this.handleWinner}
              switchSides={this.state.switchSides}
            />
          )
        }} />
        <Route path='/config' render={() => {
          return (
            <Config 
              players={this.state.players}
              switchSides={this.state.switchSides}
              darkMode={this.state.darkMode}
              onConfig={this.handleConfig}
            />
          )
        }} />
      </BrowserRouter>
    )
  }
}
  

export default App;
