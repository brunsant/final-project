import React, { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { THOUGHT_URL } from "../utils/constants";
import DndComponent from "./DndComponent";
import produce from "immer";

// import styled from "styled-components";

const dragReducer = produce((draft, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "MOVE": {
      draft[action.from] = draft[action.from] || [];
      draft[action.to] = draft[action.to] || [];
      const [removed] = draft[action.from].splice(action.fromIndex, 1);
      draft[action.to].splice(action.toIndex, 0, removed);
      break;
    }
    case "SET_ITEMS": {
      draft.items = action.items;
      break;
    }
  }
});

const GroupThoughts = () => {
  const [state, dispatch] = useReducer(dragReducer, {
    items: [],
  });
  const retroId = useSelector((store) => store.retro._id);
  // console.log("RETRO ID THOUGHTS", retroId)

  useEffect(() => {
    const options = {
      method: "GET",
    };

    fetch(THOUGHT_URL(retroId), options)
      .then((res) => res.json())
      .then((data) => {
        const items = data.map((item) => ({ ...item, id: item._id }));
        dispatch({
          type: "SET_ITEMS",
          items,
        });
      });
  }, [retroId]);

  return (
    <>
      <h1> THOUGHTS </h1>
      <DndComponent state={state} dispatch={dispatch} />
    </>
  );
};

export default GroupThoughts;
