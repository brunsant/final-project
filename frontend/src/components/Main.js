import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../utils/constants";
import user from "../reducers/user";
import retro from "../reducers/retro";
import { WithContext as ReactTags } from "react-tag-input";
import styled from "styled-components";

export const Main = () => {
  const [description, setDescription] = useState("");
  const [participants, setParticipants] = useState([]);

  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.userId);
  const userName = useSelector((store) => store.user.username);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutUser = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setAccessToken(null));

      localStorage.removeItem("user");
    });
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken, navigate]);

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
      }),
    };

    fetch(API_URL("retros"), options)
      .then((res) => res.json())
      .then((data) => {
        console.log("RETRO DATA", data);
        if (data.success) {
          batch(() => {
            dispatch(retro.actions.setDescription(data.response.description));
            dispatch(retro.actions.setAdmin(data.response.admin));
            dispatch(retro.actions.setParticipants(data.response.participants));
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

  // const suggestions = participants.map((item) => {
  //   return {
  //     id: userName,
  //     text: userId,
  //   };
  // });

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDelete = (i) => {
    setParticipants(participants.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setParticipants([...participants, tag]);
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
    <>
      <Container>
        <Button onClick={logOutUser}>Log out</Button>
        <Title>Welcome to the sprint retro app..</Title>

        <div>
          <Form onSubmit={onFormSubmit}>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Retro Title"
            ></Input>
            <ParticipantContainer>
              <p>Please add your team members</p>
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

            <SubmitButton type="submit">Create retro</SubmitButton>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 10%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 15px 10px;
  border-radius: 10px;

  @media (min-width: 768px) {
    width: 50%;
    padding: 30px 25px;
  }

  @media (min-width: 1025px) {
    width: 20%;
    padding: 30px 25px;
  }
`;

const Title = styled.h1`
  font-size: 30px;
  margin: 0px;
  padding: 20px 0;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 45px;
  }
  @media (min-width: 1025px) {
    font-size: 30px;
  }
`;
const ParticipantContainer = styled.div`
  margin: 20px;
`;
const Input = styled.input`
  padding: 20px;
  border-radius: 5px;
  margin-left: 17px;
`;

const Button = styled.button`
  width: 100px;
  padding: 15px;
  margin: 20px;
  border-radius: 15px;
  border: none;
  background-color: white;
  box-shadow: 0px 8px 15px gray;
  transition: all 0.3s ease 0s;
  cursor: pointer;
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
