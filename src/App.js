import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { animals, animalType } from './others/AnimalData';
import { getTimeRemaining, iconMove, stateOfGame } from './others/Movement';
import Modal from './components/Modal';
import Header from './components/Header';
import DropArea from './components/DropArea';


const gameDuration = 1000 * 60; // 60 second clock

const initialState = {
  farm: animals,
  [animalType.oviparous]: [],
  [animalType.mammal]: [],
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
                  id={animalType.oviparous}
                  animals={this.state[animalType.oviparous]}
                  isDropDisabled={isDropDisabled}
                />
                <DropArea id="farm" animals={farm} isDropDisabled={isDropDisabled} />
                <DropArea
                  id={animalType.mammal}
                  animals={this.state[animalType.mammal]}
                  isDropDisabled={isDropDisabled}
                />
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
