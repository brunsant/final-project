import React, { useState, useEffect, useReducer, useCallback } from "react"
import { useSelector } from "react-redux"
import { THOUGHT_RETRO_URL } from "../utils/constants"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import produce from "immer"
// import { css, cx } from "@emotion/css"

// import styled from "styled-components";

// Beautifull DND part
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

const GroupThoughts = () => {
  const [retroThoughts, setRetroThoughts] = useState([])
  const [state, dispatch] = useReducer(dragReducer, { retroThoughts })

  const retroId = useSelector((store) => store.retro._id)
  console.log("RETRO ID THOUGHTS", retroId)

  useEffect(() => {
    const options = {
      method: "GET",
    }

    fetch(THOUGHT_RETRO_URL(`${retroId}`), options)
      .then((res) => res.json())
      .then((data) => setRetroThoughts(data))
  }, [retroId])

  const onDragEnd = useCallback((result) => {
    if (result.reason === "DROP") {
      if (!result.destination) {
        console.log("yaaay")
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
  console.log("GET RETRO THOUGHTS!!!!", retroThoughts)
  console.log("STATE", state)

  return (
    <>
      <h1> THOUGHTS </h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="retroThoughts"
          type="THOUGHTS"
          className="droppable"
        >
          {(provided, snapshot) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                // className={snapshot.isDraggingOver)}
              >
                {retroThoughts?.map((thought, index) => {
                  return (
                    <Draggable
                      key={thought._id}
                      draggableId={thought._id}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
                            // className={cx(
                            //   styles.dragger,
                            //   snapshot.isDragging && styles.dragging
                            // )}
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
              </div>
            )
          }}
        </Droppable>
        <Droppable droppableId="retro2" type="THOUGHT" className="droppable">
          {(provided, snapshot) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                // className={cx(
                //   styles.dropper,
                //   snapshot.isDraggingOver && styles.dropOver
                // )}
              >
                {state.retro2?.map((thought, index) => {
                  return (
                    <Draggable
                      key={thought._id}
                      draggableId={thought._id}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
                            // className={cx(
                            //   styles.dragger,
                            //   snapshot.isDragging && styles.dragging
                            // )}
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
              </div>
            )
          }}
        </Droppable>
      </DragDropContext>
    </>
  )
}

export default GroupThoughts
