import React from "react";

import Header from "../components/Header";
import styled from "styled-components";
import ActiveRetro from "../components/ActiveRetro";
import AddRetro from "../components/AddRetro";

export const Main = () => {
  return (
    <>
      <Header />
      <Container>
        <AddRetro />
        <ActiveRetro />
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
  @media (min-width: 1025px) {
    flex-direction: row;
    margin: 50px 40px 0;
    align-content: center;
  }
`;
