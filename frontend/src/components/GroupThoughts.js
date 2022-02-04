import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { THOUGHT_URL } from "../utils/constants";
import DndComponent from "./DndComponent";

// import styled from "styled-components";

const GroupThoughts = () => {
  const [retroThoughts, setRetroThoughts] = useState([]);

  const retroId = useSelector((store) => store.retro._id);
  // console.log("RETRO ID THOUGHTS", retroId)

  useEffect(() => {
    const options = {
      method: "GET",
    };

    fetch(THOUGHT_URL(`${retroId}`), options)
      .then((res) => res.json())
      .then((data) => setRetroThoughts(data));
  }, [retroId]);

  // console.log("GET RETRO THOUGHTS!!!!", retroThoughts);

  return (
    <>
      <h1> THOUGHTS </h1>
      <DndComponent retroThoughts={retroThoughts} />
    </>
  );
};

export default GroupThoughts;
