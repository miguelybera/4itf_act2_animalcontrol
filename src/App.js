import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { ANIMALS, ANIMALTYPE } from './custom/data';
import { shuffle, getTimeLeft, move, GAME_STATE } from './custom/utils';

import Modal from './components/Modal';
import Header from './components/Header';
import DropArea from './components/DropArea';


const GAME_DURATION = 1000 * 60; // 60 second timer

const initialState = {
  // code for the shuffling of animals
  bench: shuffle(ANIMALS),
  [ANIMALTYPE.OVIPAROUS]: [],
  [ANIMALTYPE.MAMMAL]: [],
  gameState: GAME_STATE.READY,
  timeLeft: 0,
};
// hello comment 1
class App extends React.Component {
  state = initialState;

  startGame = () => {
    this.currentDeadline = Date.now() + GAME_DURATION;

    this.setState(
      {
        gameState: GAME_STATE.PLAYING,
        timeLeft: getTimeLeft(this.currentDeadline),
      },
      this.gameLoop
    );
  };

  gameLoop = () => {
    this.timer = setInterval(() => {
      const timeLeft = getTimeLeft(this.currentDeadline);
      const isTimeout = timeLeft <= 0;
      if (isTimeout && this.timer) {
        clearInterval(this.timer);
      }

      this.setState({
        timeLeft: isTimeout ? 0 : timeLeft,
        ...(isTimeout ? { gameState: GAME_STATE.DONE } : {}),
      });
    }, 1000);
  };

  endGame = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.setState({
      gameState: GAME_STATE.DONE,
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
      return move(state, source, destination);
    });
  };

  render() {
    const { gameState, timeLeft, bench, ...groups } = this.state;
    const isDropDisabled = gameState === GAME_STATE.DONE;

    return (
      <>
        <Header gameState={gameState} timeLeft={timeLeft} endGame={this.endGame} />
        {this.state.gameState !== GAME_STATE.PLAYING && (
          <Modal
            startGame={this.startGame}
            resetGame={this.resetGame}
            timeLeft={timeLeft}
            gameState={gameState}
            groups={groups}
          />
        )}
        {(this.state.gameState === GAME_STATE.PLAYING ||
          this.state.gameState === GAME_STATE.DONE) && (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="container">
              <div className="columns">
                <DropArea
                  id={ANIMALTYPE.OVIPAROUS}
                  animals={this.state[ANIMALTYPE.OVIPAROUS]}
                  isDropDisabled={isDropDisabled}
                />
                <DropArea id="bench" animals={bench} isDropDisabled={isDropDisabled} />
                <DropArea
                  id={ANIMALTYPE.MAMMAL}
                  animals={this.state[ANIMALTYPE.MAMMAL]}
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
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}

export default App;
