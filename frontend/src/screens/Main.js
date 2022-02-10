import React from "react";

import Header from "../components/Header";
import ActiveRetro from "../components/ActiveRetro";
import AddRetro from "../components/AddRetro";

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

export const Main = () => {
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
            size="lg"
          ></Button>
        </ButtonContainer>
        <ButtonContainerBig>
          <Button
            onClick={onOpen}
            rightIcon={<InfoIcon color={"#66bfa6"} boxSize={"3em"} />}
            variant="link"
            size="lg"
          ></Button>
        </ButtonContainerBig>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader> Welcome to the Team Retro!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>Your team retro starts here!</p>
              <p>
                To create a new retro, write your team's name and each
                participant's username. After created, the retro information
                should be visible as "Active Retro". Every participant should
                click on "Join retro" to start your sprint retrospective.
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
  margin: 5px 10px 0 0;

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
