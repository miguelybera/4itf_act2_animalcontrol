import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { animals, animalType } from './others/AnimalData';
import { iconMove, stateOfGame } from './others/Movement';
import Modal from './components/Modal';
import Header from './components/Header';
import DropArea from './components/DropArea';



const initialState = {
  farm: animals,
  [animalType.oviparous]: [],
  [animalType.mammal]: [],
  gameState: stateOfGame.START,

};


class App extends React.Component {
  //declaring state as the values of the initial state variable above
  state = initialState;
   
  startGame = () => {
    this.setState(
      {
        gameState: stateOfGame.CURRENT,
      },
    );
  };

  endGame = () => {
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
        this.endGame()
      }
    });
  };


  render() {
    const { gameState, timeRemaining, farm, ...groups } = this.state;
    const isDropDisabled = gameState === stateOfGame.END;
   


    return (
      <>
        <Header gameState={gameState} endGame={this.endGame} />
        {this.state.gameState !== stateOfGame.CURRENT && (
          <Modal
            startGame={this.startGame}
            resetGame={this.resetGame}
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


}

export default App;
