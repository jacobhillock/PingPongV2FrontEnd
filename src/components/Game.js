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
      const server = Math.floor((score[0] + score[1])/2)%2
      this.props.onPointChange(score, server)
      this.setState({
        number: null
      })
    } else if (event.keyCode === 40 || event.keyCode === 189) {
      const score = this.props.score
      score[this.state.number]--
      const server = Math.floor((score[0] + score[1])/2)%2
      this.props.onPointChange(score, server)
      this.setState({
        number: null,
      })
    }
  }
  render(){
    const serveBar = <div style={{background: '#16f016'}}><h5>Server</h5></div>
    const serveStatus = [
      (this.props.currentServer === 0 ? serveBar : <></>),
      (this.props.currentServer === 1 ? serveBar : <></>)
    ]
    return (
      <Container fluid>
        <Row>
          <Col align="center">
            <h1>{this.props.player1}'s wins: {this.props.wins[0]}</h1>
            <h3>Score: {this.props.score[0]}</h3>
          </Col>
          <Col align="center">
            <h1>{this.props.player2}'s wins: {this.props.wins[1]}</h1>
            <h3>Score: {this.props.score[1]}</h3>
          </Col>
        </Row>
        <Row>
          <Col align="center">
            {serveStatus[0]}
          </Col>
          <Col align="center">
          {serveStatus[1]}
          </Col>
        </Row>
      </Container>
    )
  }
}