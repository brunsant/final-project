import React from "react";

import Header from "../components/Header";
import AddActionItems from "../components/AddActionItems";
import ThoughtsAccordion from "../components/ThoughtsAccordion";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

import styled, { keyframes } from "styled-components";

const ActionItems = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Header />
      <InfoButtonContainer>
        <ButtonContainer>
          <Button
            onClick={onOpen}
            rightIcon={<InfoIcon color={"#66bfa6"} boxSize={"2em"} />}
            variant="link"
          ></Button>
        </ButtonContainer>
        <ButtonContainerBig>
          <Button
            onClick={onOpen}
            rightIcon={<InfoIcon color={"#66bfa6"} boxSize={"3em"} />}
            variant="li"
            size="lg"
          ></Button>
        </ButtonContainerBig>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>It's time to create an Action Plan</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>
                Review your team's thoughts - on the sidebar menu - and start an
                open conversation. Then create an action plan to help your team
                improve in the next sprint. You can add actions and who will be
                responsible for them.
              </p>
              <p>
                After creating the plan, the "Go to summary" button will close
                the retro for further changes, but a summary will be saved on
                every team member's profile page.
              </p>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={onClose}>
                Got it!
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
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

const pulse = keyframes`
  0%,10% {
    opacity: 0;
    transform: scale(1.1);
  }
  80% {
    opacity: 0.7;
    transform: scale(1.15,1.4);
  }
  81%, 100% {
    opacity: 0;
    transform: scale(1);
  }
`;

const Scale = keyframes`
  0% {
    transform: scale(1);
  }
  35%, 80% {
    transform: scale(1.35,1.35);
  }
  100% {
    transform: scale(1);
  }
`;

const ButtonContainer = styled.div`
  animation: ${({ layer }) => (layer ? pulse : Scale)} 1.5s;
  animation-iteration-count: 5;
  margin-right: 10px;

  @media (min-width: 1025px) {
    display: none;
  }
`;
const ButtonContainerBig = styled.div`
  display: none;

  @media (min-width: 1025px) {
    display: block;
    animation: ${({ layer }) => (layer ? pulse : Scale)} 1.5s;
    animation-iteration-count: 5;
    margin-right: 50px;
  }
`;

const HeaderTitle = styled.h2`
  font-size: 20px;
  text-align: center;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;
