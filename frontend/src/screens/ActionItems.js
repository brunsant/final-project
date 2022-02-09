import React from "react"
import Header from "../components/Header"
import AddActionItems from "../components/AddActionItems"
import GetActionItems from "../components/GetActionItems"
import ThoughtsAccordion from "../components/ThoughtsAccordion"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import { InfoIcon, InfoOutlineIcon } from "@chakra-ui/icons"
import { Button, ButtonGroup } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"

import styled, { keyframes } from "styled-components"

const ActionItems = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

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
            <ModalHeader>Your team retro starts here!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>Hello Bruna</p>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={onClose}>
                Got it!
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </InfoButtonContainer>
      <ActionItemContainer>
        <ThoughtsAccordion />
        <ActionItemsWrapper>
          <GetActionItems />

          <AddActionItems />
        </ActionItemsWrapper>
      </ActionItemContainer>
    </>
  )
}

export default ActionItems

const ActionItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px 30px;

  @media (min-width: 1025px) {
    flex-direction: row;
    margin: 10px 0px 10px 40px;
  }
`

const ActionItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`
const InfoButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: right;
  margin: 10px 10px 0 0;
`

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
`

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
`

const ButtonContainer = styled.div`
  animation: ${({ layer }) => (layer ? pulse : Scale)} 1.5s;
  animation-iteration-count: 5;
  margin-right: 10px;
  @media (min-width: 1025px) {
    display: none;
  }
`
const ButtonContainerBig = styled.div`
  display: none;
  @media (min-width: 1025px) {
    display: block;
    animation: ${({ layer }) => (layer ? pulse : Scale)} 1.5s;
    animation-iteration-count: 5;
    margin-right: 50px;
  }
`
