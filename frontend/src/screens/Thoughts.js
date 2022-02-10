import React from "react";

import Header from "../components/Header";
import AddThoughts from "../components/AddThoughts";
import GetThoughts from "../components/GetThoughts";
import NextButton from "../components/NextButton";

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

const Thoughts = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Header />
      <ThoughtsContainer>
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
              variant="link"
              size="lg"
            ></Button>
          </ButtonContainerBig>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>This is the Thoughts area</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <p>
                  Reflect about your experience during this sprint. Add your
                  thoughts and comments, specifiying which category they are a
                  part of.
                </p>
                <p>
                  All answers are anonymous, but keep in mind to be thoughtful
                  and polite to your team members.
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
        {/* components import  */}
        <GetThoughts />
        <AddThoughts />
        <ButtonContain>
          <NextButton />
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
  margin: 5px 0 0;

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
