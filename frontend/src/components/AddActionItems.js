import React, { useState } from "react";
import { useSelector } from "react-redux";

import GetActionItems from "./GetActionItems";
import NextButton from "./NextButton";

import { ACTION_PLAN_URL, ACTIVE_URL } from "../utils/constants";

import styled from "styled-components";

const AddActionItems = () => {
  const [newAction, setNewAction] = useState("");
  const [name, setName] = useState("");

  const retroId = useSelector((store) => store.retro);

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
    <AddActionItemContainer>
      <form onSubmit={handleFormSubmit}>
        <ItemContainer>
          <GetActionItems />
          <InputContainer>
            <Input
              required
              type="text"
              value={newAction}
              onChange={(e) => setNewAction(e.target.value)}
              placeholder="Add your action here"
            ></Input>
            <PostContainer>
              <Input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Add the reponsible here"
              ></Input>
            </PostContainer>
          </InputContainer>
        </ItemContainer>
        <ButtonContainer>
          <SubmitButton onClick={RefreshButton} type="submit">
            Post
          </SubmitButton>
          {/* Chakra Go to Summary button */}
          <ChakraButton onClick={handleActiveRetro} type="submit">
            <NextButton
              buttonText="Go to Summary"
              confirmationText="Are you sure? Your retro will be closed after this"
              dialogText="You can still find the summary on your profile page."
              linkNextPage="/summary"
            />
          </ChakraButton>
        </ButtonContainer>
      </form>
    </AddActionItemContainer>
  );
};

export default AddActionItems;

const ItemContainer = styled.div`
  width: 100%;
  align-self: center;

  @media (min-width: 1025px) {
    width: 70%;
    align-self: left;
  }
`;

const PostContainer = styled.div`
  display: flex;
  width: 100%;
`;

const AddActionItemContainer = styled.div`
  width: 80%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 1025px) {
    margin-top: 40px;
    width: 97%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
`;

const SubmitButton = styled.button`
  width: 130px;
  font-size: 18px;
  font-weight: 500;
  padding: 6px;
  color: white;
  margin: 0px;
  border-radius: 5px;

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
    padding: 5px;
  }
`;

const ChakraButton = styled.div`
  margin: 5px;
  align-self: center;
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
  width: 100%;
  border-radius: 5px;
`;
