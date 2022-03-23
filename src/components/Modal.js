import React from 'react';

import { stateOfGame } from '../others/State';

const Modal = ({ gameState, startGame, resetGame }) => (
  <div className="modal modal-sm active">
    <div className="modal-overlay" />
    <div className="modal-container">
      <div className="modal-header">
        
        <div className="modal-title h4">{gameState === stateOfGame.START
            ? `Animal Control`
            : `Game over`}</div>
      </div>
      <div className="modal-body">
        <div className="content h6">
          {' '}
          {gameState === stateOfGame.START
            ? `Drag and Drop the animals in the correct list of animal types.
            The Game will end once there are no animals in the Farm.
            Else, click "End Game"`
            : `Thanks for playing`}
        </div>
      </div>
      <div className="modal-footer">
        <button
          className="btn btn-primary"
          onClick={gameState === stateOfGame.START ? startGame : resetGame}
        >
          {gameState === stateOfGame.START ? 'Click to Start' : 'Reset'}
        </button>
      </div>
    </div>
  </div>
);

export default Modal;
