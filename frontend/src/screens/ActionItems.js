import React from "react";

import Header from "../components/Header";
import AddActionItems from "../components/AddActionItems";
import ThoughtsAccordion from "../components/ThoughtsAccordion";
import InfoButton from "../components/InfoButton";

import styled from "styled-components";

const ActionItems = () => {
  return (
    <>
      <Header />
      <InfoButtonContainer>
        <InfoButton
          headerText="It's time to create an Action Plan"
          infoText=" Review your team's thoughts - on the sidebar menu - and start an
          open conversation. Then create an action plan to help your team
          improve in the next sprint. You can add actions and who will be
          responsible for them. After creating the plan, the Go to summary button will close
          the retro for further changes, but a summary will be saved on
          every team member's profile page."
        />
      </InfoButtonContainer>
      {/* components import */}
      <ActionItemContainer>
        <ThoughtsAccordion />
        <ActionItemsWrapper>
          <HeaderTitle> ACTION PLAN </HeaderTitle>
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

  @media (min-width: 1025px) {
    flex-direction: row;
    margin: 10px 0px 10px 40px;
  }
`;

const ActionItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (min-width: 1025px) {
    border-left: 5px solid #011d45;
    margin-left: 50px;
  }
`;
const InfoButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: right;
  margin: 20px 10px 0 0;
`;

const HeaderTitle = styled.h2`
  font-size: 20px;
  text-align: center;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;
