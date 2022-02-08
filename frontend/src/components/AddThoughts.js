import React, { useState } from "react";
import { THOUGHT_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import { Select } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const AddThoughts = () => {
  const [newThought, setNewThought] = useState("");
  const [category, setCategory] = useState("");

  const retroId = useSelector((store) => store.retro);
  // console.log("RETRO ID Thought", retroId)

  const RefreshButton = () => {
    window.location.reload("Refresh");
  };

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
    <AddThoughtsConteiner>
      <form onSubmit={handleFormSubmit}>
        <Input
          required
          type="text"
          value={newThought}
          onChange={(e) => setNewThought(e.target.value)}
          placeholder="Add you thought here!"
        ></Input>
        <Select
          placeholder="Select option"
          required
          onChange={(e) => setCategory(e.target.value)}
          size="md"
        >
          {/* <option value="">Select category</option> */}
          <option value="Drop">Drop</option>
          <option value="Add">Add</option>
          <option value="Keep">Keep</option>
          <option value="Improve">Improve</option>
        </Select>
        <ButtonContainer>
          <SubmitButton onClick={RefreshButton} type="submit">
            Post
          </SubmitButton>
          <SubmitButton>
            <Link to="/actionitems">Go to next</Link>
          </SubmitButton>
        </ButtonContainer>
      </form>
    </AddThoughtsConteiner>
  );
};

export default AddThoughts;

const AddThoughtsConteiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Input = styled.input`
  margin: 10px 17px 20px 0;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0px 5px 6px #d3d3d3;
  border: 1px solid #66bfa6;
  width: 100%;
`;

// const Select = styled.select`
//   padding: 20px;
//   border-radius: 5px;
//   margin-left: 17px;
// `;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
`;

const SubmitButton = styled.button`
  width: 130px;
  font-size: 16px;
  padding: 5px;
  color: white;
  margin: 5px;
  border-radius: 15px;
  border: none;
  align-self: center;
  background-color: #66bfa6;
  box-shadow: 0px 5px 6px #d3d3d3;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  @media (min-width: 768px) {
    width: 120px;
    font-size: 16px;
  }
  @media (min-width: 1025px) {
    width: 150px;
    font-size: 20px;
  }
`;
