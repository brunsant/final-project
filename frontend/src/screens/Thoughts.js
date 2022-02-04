import React from "react";
import Header from "../components/Header";
import AddThoughts from "../components/AddThoughts";
import GetThoughts from "../components/GetThoughts";
import { Link } from "react-router-dom";

import styled from "styled-components";

const Thoughts = () => {
  return (
    <>
      <Header />
      <GetThoughts />
      <AddThoughts />
      <SubmitButton>
        <Link to="/grouping">Go to next</Link>
      </SubmitButton>
    </>
  );
};

export default Thoughts;

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
