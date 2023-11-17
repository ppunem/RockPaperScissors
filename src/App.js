import {Component} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {RiCloseLine} from 'react-icons/ri'
import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  state = {
    score: 0,
    playImageClicked: false,
    clickedImage: {},
    result: '',
    generated: {},
  }

  changeImage = id => {
    choicesList.map(each => {
      if (each.id === id) {
        this.setState({clickedImage: each, playImageClicked: true})
      }
    })
  }

  resetValues = () => {
    this.setState({result: '', playImageClicked: false})
  }

  renderPlayView = () => (
    <ul className="play-images-container">
      <li>
        <button
          type="button"
          className="image-button"
          key={choicesList[0].id}
          data-testid="rockButton"
          onClick={this.changeImage}
        >
          <img
            src={choicesList[0].imageUrl}
            className="image"
            alt={choicesList[0].id}
          />
        </button>
      </li>

      <li>
        <button
          type="button"
          className="image-button"
          key={choicesList[1].id}
          data-testid="scissorsButton"
          onClick={this.changeImage}
        >
          <img
            src={choicesList[1].imageUrl}
            className="image"
            alt={choicesList[1].id}
          />
        </button>
      </li>

      <li>
        <button
          type="button"
          className="image-button"
          key={choicesList[2].id}
          data-testid="paperButton"
          onClick={this.changeImage}
        >
          <img
            src={choicesList[2].imageUrl}
            className="image"
            alt={choicesList[2].id}
          />
        </button>
      </li>
    </ul>
  )

  renderGameResultsView = () => {
    const {clickedImage, result} = this.state
    const generated =
      choicesList[Math.floor(Math.random() * choicesList.length)]

    if (
      (clickedImage.id === 'ROCK' && generated.id === 'ROCK') ||
      (clickedImage.id === 'SCISSORS' && generated.id === 'SCISSORS') ||
      (clickedImage.id === 'PAPER' && generated.id === 'PAPER')
    ) {
      this.setState(prevState => ({
        result: 'IT IS DRAW',
        score: prevState.score,
      }))
    } else if (
      (clickedImage.id === 'ROCK' && generated.id === 'SCISSORS') ||
      (clickedImage.id === 'SCISSORS' && generated.id === 'PAPER') ||
      (clickedImage.id === 'PAPER' && generated.id === 'ROCK')
    ) {
      this.setState(prevState => ({
        result: 'YOU WON',
        score: prevState.score + 1,
      }))
    } else {
      this.setState(prevState => ({
        result: 'YOU LOSE',
        score: prevState.score - 1,
      }))
    }

    return (
      <div className="result-view-main-container">
        <div className="result-images-container">
          <div className="result-image-container">
            <h1 className="head">YOU</h1>
            <img
              src={clickedImage.imageUrl}
              alt={clickedImage.id}
              className="image"
            />
          </div>
          <div className="result-image-container">
            <h1 className="head">OPPONENT</h1>
            <img
              src={generated.imageUrl}
              alt={generated.id}
              className="image"
            />
          </div>
        </div>
        <p className="result-text">{result}</p>
        <button
          type="button"
          className="playagain-button"
          onClick={this.resetValues}
        >
          PLAY AGAIN
        </button>
      </div>
    )
  }

  render() {
    const {playImageClicked, score} = this.state

    return (
      <div className="main-bg">
        <div className="top-container">
          <div className="text-container">
            <p className="text">Rock</p>
            <p className="text">Paper</p>
            <p className="text">Scissors</p>
          </div>
          <div className="score-container">
            <p className="score-text">Score</p>
            <p className="score">{score}</p>
          </div>
        </div>
        {playImageClicked
          ? this.renderPlayView()
          : this.renderGameResultsView()}
        <div className="rules-button-align">
          <div className="popup-container">
            <Popup
              modal
              trigger={
                <button type="button" className="rules-button">
                  RULES
                </button>
              }
            >
              {close => (
                <div className="popup-container">
                  
                    <img src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png" alt="rules"/>
                  
                  <button
                    type="button"
                    onClick={() => close()}
                  >
                    <RiCloseLine />
                  </button>
                </div>
              )}
            </Popup>
          </div>
        </div>
      </div>
    )
  }
}

export default App
