let destListClone
// method to handle to the animal cards movement
export const iconMove = (state, source, destination) => {
  // srcListClone contains all the info of state plus the droppableId of the source variable
  const srcListClone = [...state[source.droppableId]];
  if(source.droppableId === destination.droppableId){
     destListClone =srcListClone
  }else{
    destListClone = [...state[destination.droppableId]];  
  }
      

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




