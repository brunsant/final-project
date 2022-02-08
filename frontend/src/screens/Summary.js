import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import GetThoughts from "../components/GetThoughts";
import GetActionItems from "../components/GetActionItems";

import styled from "styled-components";

const Summary = () => {
  return (
    <>
      <Header />
      <GetThoughts />
      <GetActionItems />
      <SubmitButton>
        <Link to="/"> Back to main </Link>
      </SubmitButton>
    </>
  );
};

export default Summary;

const SubmitButton = styled.button`
  padding: 10px;
  margin: 20px;
  border-radius: 15px;
  border: none;
  background-color: white;
  box-shadow: 0px 8px 15px #d3d3d3;
  transition: all 0.3s ease 0s;
  cursor: pointer;
`;
