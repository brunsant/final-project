import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import GetThoughts from "../components/GetThoughts";
import GetActionItems from "../components/GetActionItems";

import styled from "styled-components";

const Overview = () => {
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

export default Overview;

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
