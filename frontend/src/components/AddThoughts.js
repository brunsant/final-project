import React, { useState } from "react";
import { useSelector } from "react-redux";

import { THOUGHT_URL } from "../utils/constants";

import { Select } from "@chakra-ui/react";
import styled from "styled-components";

const AddThoughts = () => {
  const [newThought, setNewThought] = useState("");
  const [category, setCategory] = useState("");

  const retroId = useSelector((store) => store.retro);

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
    <>
      <AddThoughtsContainer>
        <form onSubmit={handleFormSubmit}>
          <Select
            placeholder="Select category"
            required
            onChange={(e) => setCategory(e.target.value)}
            size="md"
          >
            <option value="Add">Add</option>
            <option value="Drop">Drop</option>
            <option value="Keep">Keep</option>
            <option value="Improve">Improve</option>
          </Select>
          <InputContainer>
            <Input
              required
              type="text"
              value={newThought}
              onChange={(e) => setNewThought(e.target.value)}
              placeholder="Add you thought here!"
            ></Input>{" "}
            <SubmitButton onClick={RefreshButton} type="submit">
              Post
            </SubmitButton>
          </InputContainer>
        </form>
      </AddThoughtsContainer>
    </>
  );
};

export default AddThoughts;

const AddThoughtsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 5%;

  @media (min-width: 768px) {
    margin: 5% 20%;
  }

  @media (min-width: 1025px) {
    margin: 5% 30%;
  }
`;

const Input = styled.input`
  border-radius: 5px;
  box-shadow: 0px 5px 6px #d3d3d3;
  border: 1px solid #66bfa6;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  padding-left: 10px;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  margin: 20px 0 0 0;
`;

const SubmitButton = styled.button`
  width: 100px;
  font-size: 16px;
  border: 1px solid #66bfa6;
  padding: 5px 0;
  color: white;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 0px;
  border-top-left-radius: 0px;
  border: none;
  align-self: center;
  background-color: #66bfa6;
  box-shadow: 0px 5px 6px #d3d3d3;
  cursor: pointer;

  @media (min-width: 768px) {
    width: 120px;
    font-size: 16px;
  }

  @media (min-width: 1025px) {
    width: 150px;
    font-size: 20px;
    margin: 0;
  }
`;
