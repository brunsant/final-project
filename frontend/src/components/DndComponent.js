import { useCallback } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import styled from "styled-components";

const DndComponent = ({ state, dispatch }) => {
  console.log("DND", state);

  const onDragEnd = useCallback(
    (result) => {
      if (result.reason === "DROP") {
        if (!result.destination) {
          return;
        }
        dispatch({
          type: "MOVE",
          from: result.source.droppableId,
          to: result.destination.droppableId,
          fromIndex: result.source.index,
          toIndex: result.destination.index,
        });
      }
    },
    [dispatch]
    //NEEDED TO ADD THE DISPATCH BECAUSE OF A WARNING ON THE TERMINAL. IT WAS EMPTY BEFORE!
  );

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          <Droppable droppableId="items" type="THOUGHT">
            {(provided, snapshot) => {
              return (
                <Column ref={provided.innerRef} {...provided.droppableProps}>
                  {state.items?.map((thought, index) => {
                    return (
                      <Draggable
                        key={thought.id}
                        draggableId={thought.id}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div>
                                <span>
                                  {thought.description}-{thought.category}
                                </span>
                              </div>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </Column>
              );
            }}
          </Droppable>
          <Droppable droppableId="items2" type="THOUGHT">
            {(provided, snapshot) => {
              return (
                <Column ref={provided.innerRef} {...provided.droppableProps}>
                  {state.items2?.map((thought, index) => {
                    return (
                      <Draggable
                        key={thought.id}
                        draggableId={thought.id}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div>
                                <span>
                                  {thought.description}-{thought.category}
                                </span>
                              </div>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </Column>
              );
            }}
          </Droppable>
        </Container>
      </DragDropContext>
    </div>
  );
};

export default DndComponent;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Column = styled.div`
  border: 1px solid lightblue;
  width: 30%;
  height: 200px;
`;
