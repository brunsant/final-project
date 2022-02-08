import React from "react";
import { useSelector } from "react-redux";
import PreviousRetro from "../components/PreviousRetro";
import Header from "../components/Header";

import styled from "styled-components";

const ProfilePage = () => {
  const userId = useSelector((store) => store.user.userId.username);

  const nameCapitalized = userId.charAt(0).toUpperCase() + userId.slice(1);

  return (
    <>
      <Header />
      <Container>
        <ImageContainer>
          <Title>Hello {nameCapitalized}!</Title>
          <Image
            src="newprofile.png"
            alt="illustration of two people and a lightbulb"
          />
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
  @media (min-width: 1025px) {
    flex-direction: row;
  }
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

const Image = styled.img`
  display: none;
  @media (min-width: 991px) {
    display: block;
    margin: 30px 0 0 10px;
    padding-top: 20px;
    min-width: 400px;
  }
`;
