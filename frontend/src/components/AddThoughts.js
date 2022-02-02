import React, { useState } from "react";
import { THOUGHT_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styled from "styled-components";

const AddThoughts = () => {
  const [newThought, setNewThought] = useState("");
  const [category, setCategory] = useState("");

  const retroId = useSelector((store) => store.retro);
  // console.log("RETRO ID Thought", retroId)

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: newThought,
        retro: retroId._id,
        category,
      }),
    };
    fetch(THOUGHT_URL(`${retroId._id}`), options)
      .then((res) => res.json())
      .then((data) => setNewThought(data))
      .finally(() => setNewThought(""));
  };

  return (
    <>
      <p>{retroId._id}</p>
      <form onSubmit={handleFormSubmit}>
        <Input
          required
          type="text"
          value={newThought}
          onChange={(e) => setNewThought(e.target.value)}
          placeholder="Add you thought here!"
        ></Input>
        <Select required onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select category</option>
          <option value="Drop">Drop</option>
          <option value="Add">Add</option>
          <option value="Keep">Keep</option>
          <option value="Improve">Improve</option>
        </Select>
        <SubmitButton type="submit">Post</SubmitButton>
      </form>
      <SubmitButton>
        <Link to="/grouping"> Go to next </Link>
      </SubmitButton>
    </>
  );
};

export default AddThoughts;

const Input = styled.input`
  padding: 20px;
  border-radius: 5px;
  margin-left: 17px;
`;

const Select = styled.select`
  padding: 20px;
  border-radius: 5px;
  margin-left: 17px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  margin: 20px;
  border-radius: 15px;
  border: none;
  background-color: white;
  box-shadow: 0px 8px 15px gray;
  transition: all 0.3s ease 0s;
  cursor: pointer;
`;
