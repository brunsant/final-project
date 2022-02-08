import React from "react";
import Header from "../components/Header";
import AddActionItems from "../components/AddActionItems";
import GetActionItems from "../components/GetActionItems";
import ThoughtsAccordion from "../components/ThoughtsAccordion";

import styled from "styled-components";

const ActionItems = () => {
  return (
    <>
      <Header />
      <ActionItemContainer>
        <ThoughtsAccordion />
        <ActionItemsWrapper>
          <GetActionItems />

          <AddActionItems />
        </ActionItemsWrapper>
      </ActionItemContainer>
    </>
  );
};

export default ActionItems;

const ActionItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px 30px;
  height: 100vh;

  @media (min-width: 1025px) {
    flex-direction: row;
  }
`;

const ActionItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
