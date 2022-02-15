import React from "react";

import Header from "../components/Header";
import AddThoughts from "../components/AddThoughts";
import GetThoughts from "../components/GetThoughts";
import NextButton from "../components/NextButton";
import InfoButton from "../components/InfoButton";

import styled from "styled-components";

const Thoughts = () => {
  return (
    <>
      <Header />
      <ThoughtsContainer>
        <InfoButtonContainer>
          <InfoButton
            headerText="This is the Thoughts area"
            infoText=" Reflect about your experience during this sprint. Add your
          thoughts and comments, specifiying which category they are a
          part of. All answers are anonymous, but keep in mind to be thoughtful
          and polite to your team members."
          />
        </InfoButtonContainer>
        {/* components import  */}
        <GetThoughts />
        <AddThoughts />
        <ButtonContain>
          <NextButton
            buttonText="Go to next"
            confirmationText="Are you sure?"
            dialogText="Check if your team is ready to procced."
            linkNextPage="/actionitems"
          />
        </ButtonContain>
      </ThoughtsContainer>
    </>
  );
};

export default Thoughts;

const ButtonContain = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: 1025px) {
    justify-content: end;
    margin: 0 5% 5% 0;
  }
`;

const ThoughtsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 20px;
`;
const InfoButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: right;
  margin-top: 20px;
`;
