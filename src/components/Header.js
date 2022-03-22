import React from 'react';

import { stateOfGame, secondsLeft } from '../others/Movement';

const Header = ({ timeRemaining, gameState, endGame }) => (
  <header className="navbar">
    {gameState === stateOfGame.CURRENT && (
      <>
        <section className="navbar-center text-error">{secondsLeft(timeRemaining)} Seconds Left</section>
        <section className="navbar-center">
          <button className="btn btn-default" onClick={endGame}>
            End Game
          </button>
        </section>
      </>
    )}
  </header>
);

export default Header;
