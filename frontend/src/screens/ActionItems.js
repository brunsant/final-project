import React from "react";
import Header from "../components/Header";
import AddActionItems from "../components/AddActionItems";
import GetActionItems from "../components/GetActionItems";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { ACTIVE_URL } from "../utils/constants";

import styled from "styled-components";

const ActionItems = () => {
  const retroId = useSelector((store) => store.retro);

  const handleFormSubmit = (event) => {
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

  return (
    <>
      <Header />
      <GetActionItems />
      <AddActionItems />
      <SubmitButton onClick={handleFormSubmit}>
        <Link to="/overview"> Go to overview </Link>
      </SubmitButton>
    </>
  );
};

export default ActionItems;

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
