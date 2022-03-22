import React from 'react';

import { stateOfGame } from '../others/Movement';

const Header = ({gameState, endGame }) => (
  <header className="navbar">
    {gameState === stateOfGame.CURRENT && (
      <>
        <section className="navbar-center text-error"></section>
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
