
// This is method is needed for the animals to stay on their respective dropped area. Without this, they will return to the farm area
export const iconMove = (state, source, destination) => {
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

// getting the remaining time
export const getTimeRemaining = deadline => deadline - Date.now();

// to get the remaining time in seconds  
export const secondsLeft = timeRemaining => Math.floor(timeRemaining / 1000);

// State of the game
export const stateOfGame = {
  START: 'ready',
  CURRENT: 'current',
  END: 'end',
};
