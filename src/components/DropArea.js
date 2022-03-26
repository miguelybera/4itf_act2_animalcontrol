import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const DropArea = ({ isDropDisabled, animals, id }) => (
  <div className="column" >
    <div className="divider" data-content={id.toUpperCase()} />
    <Droppable droppableId={id} isDropDisabled={isDropDisabled}>
      {provided => {
        return (
          <div className="menu animal-list" {...provided.droppableProps} ref={provided.innerRef}>
            {animals.map(({ name, image }, index) => (
              <Animal key={name} name={name} image={image} index={index} />
            ))}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  </div>

);

const Animal = ({ name, index, image }) => (
  <Draggable key={name} image={image} draggableId={name} index={index}>
    {provided => {
      return (
        <div
          className="menu-item tile tile-centered"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <figure style={{ backgroundColor: 'white' }} className="avatar tile-icon">
            <img src={image} alt={name} />
          </figure>
          <div className="tile-content">{name}</div>
        </div>
      );
    }}
  </Draggable>
);

export default DropArea;
