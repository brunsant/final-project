import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { THOUGHT_RETRO_URL } from "../utils/constants";

// import styled from "styled-components";

const GroupThoughts = () => {
  const [retroThoughts, setRetroThoughts] = useState([]);

  const retroId = useSelector((store) => store.retro._id);
  console.log("RETRO ID THOUGHTS", retroId);

  useEffect(() => {
    const options = {
      method: "GET",
    };

    fetch(THOUGHT_RETRO_URL(`${retroId}`), options)
      .then((res) => res.json())
      .then((data) => setRetroThoughts(data));
  }, [retroId]);
  console.log("GET RETRO THOUGHTS!!!!", retroThoughts);

  return (
    <>
      <h1> THOUGHTS </h1>
      <div>
        <div>
          {retroThoughts.map((item) => (
            <div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GroupThoughts;
