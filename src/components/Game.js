import React, { Component } from "react"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Game extends Component {
  constructor(props){
    super(props)

    this.state = {
      number: null,
    }

    this.keydown = this.handleKeyPress.bind(this)
    this.setWinner = this.setWinner.bind(this)
  }
  componentDidMount(){
    window.addEventListener('keydown', this.keydown)
  }
  componentWillUnmount(){
    window.removeEventListener('keydown', this.keydown)
  }
  handleKeyPress (event) {
    // Set the player to increase/decrease
    if(event.keyCode === 49){
      this.setState({number:0})
    } else if (event.keyCode === 50) {
      this.setState({number:1})
    }
    
    // Increase/Decrease set player
    if (event.keyCode === 38 || event.keyCode === 187) {
      const score = this.props.score
      score[this.state.number]++
      this.props.onPointChange(score)
      this.setState({
        number: null,
      })
    } else if (event.keyCode === 40 || event.keyCode === 189) {
      const score = this.props.score
      score[this.state.number]--
      this.props.onPointChange(score)
      this.setState({
        number: null,
      })
    }
  }
  setWinner(winner){
    var wins = this.props.wins
    wins[winner]++
    this.props.onWinner(wins)
    this.setState({
      number: null,
    })
  }
  renderBarWinner(){
    if (((this.props.score[0] < 11) && (this.props.score[0] < 11)) || (Math.abs(this.props.score[0] - this.props.score[1]) < 2)){
      const serveBar = <div style={{background: '#16f016'}}><h5>Server</h5></div>
      const serverStatus = [
        (this.props.server === 0 ? serveBar : <></>),
        (this.props.server === 1 ? serveBar : <></>)
      ]
      return (
        <>
          <Col align="center">
            {serverStatus[0]}
          </Col>
          <Col align="center">
            {serverStatus[1]}
          </Col>
        </>
      )
    } else {
      const plWinner = (this.props.score[0] > this.props.score[1]) ? 0 : 1
      const winner = (
        <button onClick={() => (this.setWinner(plWinner))}>
          <Col>
            <h2>
              {this.props.players[plWinner]} is the Winner!!!
            </h2>
          </Col>
        </button>
      )
      return (
        <Col align="center">
          {winner}
        </Col>
      )
    }
  }
  render(){
    const bar = this.renderBarWinner()
    return (
      <Container fluid>
        <Row>
          <Col align="center">
            <h1>{this.props.players[0]}'s wins: {this.props.wins[0]}</h1>
            <h3>Score: {this.props.score[0]}</h3>
          </Col>
          <Col align="center">
            <h1>{this.props.players[1]}'s wins: {this.props.wins[1]}</h1>
            <h3>Score: {this.props.score[1]}</h3>
          </Col>
        </Row>
        <Row>
          {bar}
        </Row>
      </Container>
    )
  }
}