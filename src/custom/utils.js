import { ANIMALTYPE, ANIMALS } from './data';

// shuffle algorithm
export function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// method to handle points calculation based on sort order as well as grouping
function calculateScore(groupedAnimals, animaltype) {
  const correctOrder = ANIMALS.filter(animal => animal.type === animaltype).sort((a, b) =>
    a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
  );

  return groupedAnimals.reduce((score, { name }, index) => {
    const maxPoint = ANIMALS.length;
    const animalIndex = correctOrder.findIndex(animal => animal.name === name);
    const penalty = animalIndex >= 0 ? Math.abs(index - animalIndex) : maxPoint;
    console.log({ name, points: maxPoint - penalty });
    return score + (maxPoint - penalty);
  }, 0);
}

export function getTotalScore(groups, timeLeft) {
  const gameScore = Object.values(ANIMALTYPE).reduce(
    (sum, animalType) => sum + calculateScore(groups[animalType], animalType),
    0
  );
  const timeBonus = getSeconds(timeLeft);
  return gameScore ? gameScore + timeBonus : 0;
}

// method to handle to the heroe cards movement
export const move = (state, source, destination) => {
  const srcListClone = [...state[source.droppableId]];
  const destListClone =
    source.droppableId === destination.droppableId
      ? srcListClone
      : [...state[destination.droppableId]];

  const [movedElement] = srcListClone.splice(source.index, 1);
  destListClone.splice(destination.index, 0, movedElement);

  return {
    [source.droppableId]: srcListClone,
    ...(source.droppableId === destination.droppableId
      ? {}
      : {
          [destination.droppableId]: destListClone,
        }),
  };
};

// method to get time left
export const getTimeLeft = deadline => deadline - Date.now();

// method to get time left in seconds
export const getSeconds = timeLeft => Math.floor(timeLeft / 1000);

// enums for representing the game state
export const GAME_STATE = {
  READY: 'ready',
  PLAYING: 'playing',
  DONE: 'done',
};
