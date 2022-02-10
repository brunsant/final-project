import React from "react";

import Header from "../components/Header";

import styled from "styled-components";

const NotFound = () => {
  return (
    <>
      <Header />
      <Container>
        <TextContainer>
          <h1>Sorry!</h1>
          <h1>Page not found</h1>
        </TextContainer>
        <Image
          src="notfound.svg"
          alt="illustration of a group of people with a lightbulb"
        />
      </Container>
    </>
  );
};

export default NotFound;

const Container = styled.div`
  display: flex;
  justify-contente: center;
  align-items: center;
  flex-direction: column;
`;

const TextContainer = styled.div`
  text-align: center;
  margin-top: 30px;
  font-size: 20px;

  @media (min-width: 768px) {
    font-size: 32px;
    margin-bottom: 30px;
  }

  @media (min-width: 1025px) {
    font-size: 36px;
  }
`;
const Image = styled.img`
  width: 300px;
  height: 300px;

  @media (min-width: 768px) {
    width: 450px;
    height: 450px;
  }

  @media (min-width: 1025px) {
    width: 550px;
    height: 550px;
  }
`;
