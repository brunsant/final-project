import React from "react";

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

const InfoButton = ({ headerText, infoText }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
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
          <ModalHeader> {headerText}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{infoText}</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Got it!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InfoButton;

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
