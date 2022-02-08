import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { WithContext as ReactTags } from "react-tag-input";

import { API_URL } from "../utils/constants";
import retro from "../reducers/retro";
import styled from "styled-components";

export const AddRetro = () => {
  const [description, setDescription] = useState("");
  const [participants, setParticipants] = useState([]);
  const [userList, setUserList] = useState("");

  const userId = useSelector((store) => store.user.userId);

  const RefreshButton = () => {
    window.location.reload("Refresh");
  };

  const dispatch = useDispatch();

  const onFormSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description,
        admin: userId,
        participants,
        active: true,
      }),
    };

    fetch(API_URL("retros"), options)
      .then((res) => res.json())
      .then((data) => {
        console.log("RETRO DATA", data);
        if (data.success) {
          batch(() => {
            dispatch(retro.actions.setRetroId(data.response._id));
            dispatch(retro.actions.setDescription(data.response.description));
            dispatch(retro.actions.setAdmin(data.response.admin));
            dispatch(retro.actions.setParticipants(data.response.participants));
            dispatch(retro.actions.setActive(true));
            dispatch(retro.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(retro.actions.setDescription(null));
            dispatch(retro.actions.setAdmin(null));
            dispatch(retro.actions.setParticipants(null));
            dispatch(retro.actions.setError(data.response));
          });
        }
      });
  };

  useEffect(() => {
    fetch(API_URL("users"))
      .then((res) => res.json())
      .then((data) => setUserList(data.response));
  }, []);

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDelete = (i) => {
    setParticipants(participants.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    const addUser = userList.find((user) => user.username === tag.text);

    if (addUser) {
      setParticipants([...participants, tag]);
    } else {
      alert("Invalid username");
    }
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newParticipants = participants.slice();

    newParticipants.splice(currPos, 1);
    newParticipants.splice(newPos, 0, tag);

    // re-render
    setParticipants(newParticipants);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };
  return (
    <RetroForm>
      <HeaderTitle> Create your retro here! </HeaderTitle>
      <Form onSubmit={onFormSubmit}>
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Retro Title"
        ></Input>
        <Text>Please add your team members</Text>

        <ParticipantContainer>
          <ReactTags
            tags={participants}
            placeholder="Press enter to add new member"
            // suggestions={suggestions}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            handleTagClick={handleTagClick}
            inputFieldPosition="top"
            autocomplete
          />
        </ParticipantContainer>

        <SubmitButton onClick={RefreshButton} type="submit">
          Create retro
        </SubmitButton>
      </Form>
    </RetroForm>
  );
};

export default AddRetro;

const RetroForm = styled.div`
  background-color: white;
  @media (min-width: 768px) {
    border: 2px solid #66bfa6;
    border-radius: 10px;
    margin: 0 80px 40px;
    padding-top: 20px;
  }
  @media (min-width: 1025px) {
    width: 100%;
    max-width: 600px;
    height: 550px;
    margin: 0;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 10px;
    border-top-right-radius: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const HeaderTitle = styled.h2`
  font-size: 22px;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 28px;
  }
  @media (min-width: 1025px) {
    font-size: 30px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 10px;
  border-radius: 10px;

  @media (min-width: 768px) {
    padding: 30px 25px;
  }
`;
const ParticipantContainer = styled.div`
  margin: 10px 0;
  font-size: 20px;
`;
const Input = styled.input`
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0px 5px 6px #d3d3d3;
  border: 1px solid #66bfa6;
  width: 250px;
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

const Text = styled.p`
  font-size: 16px;
  margin: 10px 0 0;
  @media (min-width: 768px) {
    font-size: 20px;
  }
`;
