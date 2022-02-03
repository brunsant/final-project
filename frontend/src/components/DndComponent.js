import { useCallback, useReducer } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import produce from "immer"

import styled from "styled-components"

const dragReducer = produce((draft, action) => {
  switch (action.type) {
    case "MOVE": {
      draft[action.from] = draft[action.from] || []
      draft[action.to] = draft[action.to] || []
      const [removed] = draft[action.from].splice(action.fromIndex, 1)
      draft[action.to].splice(action.toIndex, 0, removed)
    }
  }
})

const DndComponent = ({ retroThoughts }) => {
  const [state, dispatch] = useReducer(dragReducer, {
    retroThoughts,
  })
  console.log("DND", retroThoughts)

  const onDragEnd = useCallback((result) => {
    if (result.reason === "DROP") {
      if (!result.destination) {
        return
      }
      dispatch({
        type: "MOVE",
        from: result.source.droppableId,
        to: result.destination.droppableId,
        fromIndex: result.source.index,
        toIndex: result.destination.index,
      })
    }
  }, [])

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          <Droppable droppableId="retroThoughts" type="THOUGHT">
            {(provided, snapshot) => {
              return (
                <Column ref={provided.innerRef} {...provided.droppableProps}>
                  {state.retroThoughts?.map((thought, index) => {
                    return (
                      <Draggable
                        key={thought._id}
                        draggableId={thought._id}
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
                                <span>{thought.description}</span>
                              </div>
                            </div>
                          )
                        }}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                </Column>
              )
            }}
          </Droppable>
          <Droppable droppableId="items2" type="THOUGHT">
            {(provided, snapshot) => {
              return (
                <Column ref={provided.innerRef} {...provided.droppableProps}>
                  {state.items2?.map((thought, index) => {
                    return (
                      <Draggable
                        key={thought._id}
                        draggableId={thought._id}
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
                                <span>{thought.description}</span>
                              </div>
                            </div>
                          )
                        }}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                </Column>
              )
            }}
          </Droppable>
        </Container>
      </DragDropContext>
    </div>
  )
}

export default DndComponent

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`

const Column = styled.div`
  border: 1px solid lightblue;
  width: 30%;
  height: 200px;
`
