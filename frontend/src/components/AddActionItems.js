import React, { useState } from "react";
import { ACTION_PLAN_URL, ACTIVE_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styled from "styled-components";

const AddActionItems = () => {
  const [newAction, setNewAction] = useState("");
  const [name, setName] = useState("");

  const retroId = useSelector((store) => store.retro);
  // console.log("RETRO ID Thought", retroId)

  //Patch to send the retro to inactive
  const handleActiveRetro = (event) => {
    event.preventDefault();

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        active: false,
      }),
    };
    fetch(ACTIVE_URL(`${retroId._id}`), options)
      .then((res) => res.json())
      .then((data) => data);
  };

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
        description: newAction,
        name,
        retro: retroId._id,
      }),
    };
    fetch(ACTION_PLAN_URL(`${retroId._id}`), options)
      .then((res) => res.json())
      .then((data) => setNewAction(data))
      .finally(() => setNewAction(""), setName(""));
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <InputContainer>
          <Input
            required
            type="text"
            value={newAction}
            onChange={(e) => setNewAction(e.target.value)}
            placeholder="Add your action here!"
          ></Input>
          <Input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Add the reponsable here!"
          ></Input>
        </InputContainer>
        <ButtonContainer>
          <SubmitButton onClick={RefreshButton} type="submit">
            Post
          </SubmitButton>
          <SubmitButton onClick={handleActiveRetro} type="submit">
            <Link to="/summary">Go to summary</Link>
          </SubmitButton>
        </ButtonContainer>
      </form>
    </div>
  );
};

export default AddActionItems;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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

const Input = styled.input`
  margin: 10px 0 10px;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0px 5px 6px #d3d3d3;
  border: 1px solid #66bfa6;
  width: 80%;
`;
