import React from "react";
import { useSelector } from "react-redux";

import Header from "../components/Header";
import PreviousRetro from "../components/PreviousRetro";

import styled from "styled-components";

const ProfilePage = () => {
  const userId = useSelector((store) => store.user.username);
  console.log("USER ID PROFILE PAGE", userId);

  const nameCapitalized = userId.charAt(0).toUpperCase() + userId.slice(1);

  return (
    <>
      <Header />
      <Container>
        <ImageContainer>
          <Title>Hello {nameCapitalized}!</Title>
        </ImageContainer>
        <PreviousRetro />
      </Container>
    </>
  );
};

export default ProfilePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Title = styled.h2`
  font-size: 25px;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 30px;
    margin-top: 50px;
  }

  @media (min-width: 1025px) {
    font-size: 36px;
    color: black;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
