import React from "react";
import Navbar from "./Navbar";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <Title> RETRO</Title>
      <Navbar />
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: #16a795; */
  background-image: linear-gradient(
    to right,
    #16a795,
    #21aba6,
    #35aeb4,
    #4bb1c0,
    #61b4c9
  );
  min-height: 70px;
  padding-right: 20px;
`;

const Title = styled.h1`
  font-size: 32px;
  padding: 0 20px;
  color: white;

  @media (min-width: 768px) {
    font-size: 42px;
    color: white;
  }
`;
