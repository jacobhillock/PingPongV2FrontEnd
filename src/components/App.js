import React, { Component } from "react"
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      player1: 'p1',
      player2: 'p2',
      score: [0, 0],
      currentServer: 0,
      switchSides: false,
    }
  }
  render () {
    return (
      <BrowserRouter>
        <div>
          <ul>
            <li><Link to='/'>Game</Link></li>
            <li><Link to='/config'>Configure</Link></li>
          </ul>
          <Route exact path='/' render={() => {
            return <h1>Home</h1>
          }} />
          <Route exact path='/config' render={() => {
            return <h1>Config</h1>
          }} />
        </div>
      </BrowserRouter>
    )
  }
}
  

export default App;
