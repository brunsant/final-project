import React from "react";

import Header from "../components/Header";

import styled from "styled-components";

const AboutUs = () => {
  return (
    <>
      <Header />
      <Container>
        <Title>ABOUT US</Title>
        <TextContainer>
          <DescriptionText>
            This website was developed and designed by Bruna Dos Santos Araujo
            and Emelie Lindblom as a final project for the Technigo web
            development bootcamp in the fall of 2021.
          </DescriptionText>
          <DescriptionText>
            This project is a sprint retrospective tool where you can create a
            user and invite other users to do a interactive retro together. All
            participants can write reflective thoughts and categorise them by
            "add", "keep" "drop" "improve". Then the users are able to move to
            the next step and discuss everyone's (anonymous) thoughts, and
            create an action plan. Once the retrospective is over a summary is
            created and saved in the user's profile page.
          </DescriptionText>
        </TextContainer>
      </Container>
    </>
  );
};

export default AboutUs;

const Container = styled.div`
  display: flex;
  justify-contente: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;

  @media (min-width: 768px) {
    margin-top: 60px;
  }
`;

const TextContainer = styled.div`
  text-align: center;
  width: 80%;
  margin-top: 30px;

  @media (min-width: 768px) {
    margin-bottom: 30px;
  }

  @media (min-width: 1025px) {
    border: 2px solid #66bfa6;
    border-radius: 10px;
    padding: 2% 5%;
    width: 60%;
    background-color: whitesmoke;
  }
`;

const Title = styled.h1`
  font-size: 20px;

  @media (min-width: 768px) {
    font-size: 32px;
  }

  @media (min-width: 1025px) {
    font-size: 32px;
  }
`;

const DescriptionText = styled.p`
  font-size: 16px;
  margin-top: 10px;

  @media (min-width: 768px) {
    font-size: 25px;
    margin-bottom: 30px;
  }

  @media (min-width: 1025px) {
    font-size: 28px;
  }
`;
