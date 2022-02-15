import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../components/Header";
import ActiveRetro from "../components/ActiveRetro";
import AddRetro from "../components/AddRetro";
import InfoButton from "../components/InfoButton";

import styled from "styled-components";

const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken, navigate]);

  return (
    <>
      <Header />
      <InfoButtonContainer>
        <InfoButton
          headerText="Welcome to the Team Retro!"
          infoText=" Your team retro starts here. To create a new retro, write your team's name and each participant's username. After created, the retro information should be visible as Active Retro. Every participant should click on Join retro to start your sprint retrospective."
        />
      </InfoButtonContainer>
      {/* components import */}
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

  @media (min-width: 1025px) {
    flex-direction: row;
    margin: 20px 0;
    align-content: center;
  }
`;
const InfoButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: right;
  margin-top: 20px;
`;
