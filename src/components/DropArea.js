import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const DropArea = ({ isDropDisabled, animals, id }) => (
  <div className="column col-4">
    <div className="divider" data-content={id.toUpperCase()} />
    <Droppable droppableId={id} isDropDisabled={isDropDisabled}>
      {provided => {
        return (
          <div className="menu animal-list" {...provided.droppableProps} ref={provided.innerRef}>
            {animals.map(({ name }, index) => (
              <Animal key={name} name={name} index={index} />
            ))}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  </div>
);

const Animal = ({ name, index }) => (
  <Draggable key={name} draggableId={name} index={index}>
    {provided => {
      return (
        <div
          className="menu-item tile tile-centered"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <figure style={{ backgroundColor: 'transparent' }} className="avatar tile-icon">
            <img src={`https://cdn4.vectorstock.com/i/1000x1000/75/33/flat-style-character-avatar-icon-vector-19367533.jpg`} alt={name} />
          </figure>
          <div className="tile-content">{name}</div>
        </div>
      );
    }}
  </Draggable>
);

export default DropArea;
