import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { animals, animalType } from './others/AnimalData';
import { getTimeRemaining, iconMove, stateOfGame } from './others/Movement';

import Modal from './components/Modal';
import Header from './components/Header';
import DropArea from './components/DropArea';


const GAME_DURATION = 1000 * 60; // 60 second clock

const initialState = {
  bench: animals,
  [animalType.oviparous]: [],
  [animalType.mammal]: [],
  gameState: stateOfGame.START,
  timeRemaining: 0,
};
// hello comment 1
class App extends React.Component {
  state = initialState;

  startGame = () => {
    this.currentDeadline = Date.now() + GAME_DURATION;

    this.setState(
      {
        gameState: stateOfGame.CURRENT,
        timeRemaining: getTimeRemaining(this.currentDeadline),
      },
      this.gameLoop
    );
  };

  gameLoop = () => {
    this.clock = setInterval(() => {
      const timeRemaining = getTimeRemaining(this.currentDeadline);
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
    });
  };

  render() {
    const { gameState, timeRemaining, bench, ...groups } = this.state;
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
                <DropArea id="bench" animals={bench} isDropDisabled={isDropDisabled} />
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
