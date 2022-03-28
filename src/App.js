import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { animals, animalType } from './others/AnimalData';
import { iconMove } from './others/Movement';
import { getTimeRemaining } from './others/Time';
import { stateOfGame } from './others/State';
import Modal from './components/Modal';
import Header from './components/Header';
import DropArea from './components/DropArea';
import './index.css';
import './App.css'


const gameDuration = 60 * 1000; // 60 second clock

const initialState = {
  farm: animals,
  [animalType.amphibians]: [],
  [animalType.invertibrates]: [],
  [animalType.mammals]: [],
  [animalType.fish]: [],
  [animalType.birds]: [],
  [animalType.reptiles]: [],
  gameState: stateOfGame.START,
  timeRemaining: 0,
};


class App extends React.Component {
  //declaring state as the values of the initial state variable above
  state = initialState;

  startGame = () => {
    // this declares when the game will end the current date adding the 60 second clock 
    this.gameEnding = Date.now() + gameDuration;

    this.setState(
      {
        gameState: stateOfGame.CURRENT,
        timeRemaining: getTimeRemaining(this.gameEnding),
      },
      this.gameLoop
    );
  };

  gameLoop = () => {
    this.clock = setInterval(() => {
      const timeRemaining = getTimeRemaining(this.gameEnding);
      const endTime = timeRemaining <= 0;
      if (endTime && this.clock) {
        clearInterval(this.clock);
      }

      this.setState({
        timeRemaining: endTime ? 0 : timeRemaining,
        ...(endTime ? { gameState: stateOfGame.END } : {}),
      });
    }, 1000);
  };

  endGame = () => {
    if (this.clock) {
      clearInterval(this.clock);
    }

    this.setState({
      gameState: stateOfGame.END,
    });
  };

  resetGame = () => {
    this.setState(initialState);
  };

  onDragEnd = ({ source, destination }) => {
    if (!destination) {
      return;
    }

    this.setState(state => {
      return iconMove(state, source, destination);
    }, ()=>{
      if(this.state.farm.length === 0){
        this.setState({
          gameState: stateOfGame.END,
        });
      }
    });
  };


  render() {
    const { gameState, timeRemaining, farm, ...groups } = this.state;
    const isDropDisabled = gameState === stateOfGame.END;

    return (
      <>
        <Header gameState={gameState} timeRemaining={timeRemaining} endGame={this.endGame} />
        {this.state.gameState !== stateOfGame.CURRENT && (
          <Modal
            startGame={this.startGame}
            resetGame={this.resetGame}
            timeRemaining={timeRemaining}
            gameState={gameState}
            groups={groups}
          />
        )}
        {(this.state.gameState === stateOfGame.CURRENT ||
          this.state.gameState === stateOfGame.END) && (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="container">
            <div className="columns">
            <DropArea
                  id={animalType.amphibians}
                  animals={this.state[animalType.amphibians]}
                  isDropDisabled={isDropDisabled}
                  style={{
                    backgroundColor: 'transparent',
                    opacity: 0.9
                    }}
                />
                <DropArea
                  id={animalType.invertibrates}
                  animals={this.state[animalType.invertibrates]}
                  isDropDisabled={isDropDisabled}
                />
                <DropArea
                  id={animalType.mammals}
                  animals={this.state[animalType.mammals]}
                  isDropDisabled={isDropDisabled}
                />
                <DropArea
                  id={animalType.fish}
                  animals={this.state[animalType.fish]}
                  isDropDisabled={isDropDisabled}
                />
                <DropArea
                  id={animalType.birds}
                  animals={this.state[animalType.birds]}
                  isDropDisabled={isDropDisabled}
                />
                <DropArea
                  id={animalType.reptiles}
                  animals={this.state[animalType.reptiles]}
                  isDropDisabled={isDropDisabled}

                />
              <div className="rows">
              <DropArea id="farm" animals={farm} isDropDisabled={isDropDisabled} />
              </div>
              </div>
              </div>
          </DragDropContext>
        )}
      </>
    );
  }

  componentWillUnmount() {
    if (this.clock) {
      clearInterval(this.clock);
    }
  }
}

export default App;
