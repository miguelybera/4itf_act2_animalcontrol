import React from 'react';

import { secondsLeft } from '../others/Time';
import { stateOfGame } from '../others/State';

const Header = ({ timeRemaining, gameState, endGame }) => (
  <header className="navbar">
    {gameState === stateOfGame.CURRENT && (
      <>
        <section className="navbar-center text-error">{secondsLeft(timeRemaining)} Seconds Left</section>
        <section className="navbar-center">
          <button className="btn btn-error" onClick={endGame}>
            End Game
          </button>
        </section>
      </>
    )}
  </header>
);

export default Header;
