import React from 'react';

import { stateOfGame } from '../others/Movement';

const Modal = ({ gameState, startGame, resetGame }) => (
  <div className="modal modal-sm active">
    <div className="modal-overlay" />
    <div className="modal-container">
      <div className="modal-header">
        
        <div className="modal-title h4">{gameState === stateOfGame.START
            ? `Line Up the Animals in their Proper Place`
            : `Game over`}</div>
      </div>
      <div className="modal-body">
        <div className="content h6">
          {' '}
          {gameState === stateOfGame.START
            ? `Drag and Drop the animals in the correct list of animal types, sort them alphabetically and quickly for better score.
            If you're done before the time ends click on "End Game"`
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
