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
    <Container>
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
      player1: 'Player 1',
      player2: 'Player 2',
      wins: [0, 0],
      score: [0, 0],
      currentServer: 0,
      switchSides: false,
    }
    this.handlePointChange = this.handlePointChange.bind(this)
  }
  handlePointChange(score, currentServer){
    this.setState({
      score,
      currentServer
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
              player1={this.state.player1}
              player2={this.state.player2}
              wins={this.state.wins}
              score={this.state.score}
              currentServer={this.state.currentServer}
              onPointChange={this.handlePointChange}
              switchSides={this.state.switchSides}
            />
          )
        }} />
        <Route path='/config' render={() => {
          return (
            <Config />
          )
        }} />
      </BrowserRouter>
    )
  }
}
  

export default App;
