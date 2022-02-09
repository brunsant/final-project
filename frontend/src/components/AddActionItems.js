import React, { useState } from "react"
import { ACTION_PLAN_URL, ACTIVE_URL } from "../utils/constants"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"

import styled from "styled-components"

const AddActionItems = () => {
  const [newAction, setNewAction] = useState("")
  const [name, setName] = useState("")

  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()

  const retroId = useSelector((store) => store.retro)
  // console.log("RETRO ID Thought", retroId)

  //Patch to send the retro to inactive
  const handleActiveRetro = (event) => {
    event.preventDefault()

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        active: false,
      }),
    }
    fetch(ACTIVE_URL(`${retroId._id}`), options)
      .then((res) => res.json())
      .then((data) => data)
  }

  const RefreshButton = () => {
    window.location.reload("Refresh")
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: newAction,
        name,
        retro: retroId._id,
      }),
    }
    fetch(ACTION_PLAN_URL(`${retroId._id}`), options)
      .then((res) => res.json())
      .then((data) => setNewAction(data))
      .finally(() => setNewAction(""), setName(""))
  }
  return (
    <AddActionItemContainer>
      <form onSubmit={handleFormSubmit}>
        <InputContainer>
          <Input
            required
            type="text"
            value={newAction}
            onChange={(e) => setNewAction(e.target.value)}
            placeholder="Add your action here!"
          ></Input>
          <PostContainer>
            <Input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Add the reponsable here!"
            ></Input>{" "}
            <SubmitButton onClick={RefreshButton} type="submit">
              Post
            </SubmitButton>
          </PostContainer>
        </InputContainer>
        <ButtonContainer>
          <ChakraButton onClick={handleActiveRetro} type="submit">
            <Button
              colorScheme="orange"
              variant="solid"
              color={"white"}
              onClick={() => setIsOpen(true)}
            >
              Go to Summary
            </Button>

            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Go to Summary
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure? Your retro will be closed after this.
                  </AlertDialogBody>
                  <AlertDialogBody>
                    You can still find the summary on your profile page.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button colorScheme="orange" onClick={onClose} ml={3}>
                      <Link to="/summary">Go to Summary</Link>
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </ChakraButton>
        </ButtonContainer>
      </form>
    </AddActionItemContainer>
  )
}

export default AddActionItems

const PostContainer = styled.div`
  display: flex;
  width: 80%;
`

const AddActionItemContainer = styled.div`
  width: 80%;

  @media (min-width: 1025px) {
    border-left: 5px solid black;
    padding-left: 30px;
  }
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 1025px) {
    margin-top: 40px;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
`

const SubmitButton = styled.button`
  width: 130px;
  font-size: 16px;
  padding: 5px;
  color: white;
  margin: 0px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 0px;
  border-top-left-radius: 0px;

  border: none;
  align-self: center;
  background-color: #66bfa6;
  box-shadow: 0px 5px 6px #d3d3d3;
  cursor: pointer;
  @media (min-width: 768px) {
    width: 120px;
    font-size: 16px;
  }
  @media (min-width: 1025px) {
    width: 150px;
    font-size: 20px;
  }
`

const ChakraButton = styled.button`
  width: 130px;
  font-size: 16px;
  padding: 5px;
  color: white;
  margin: 5px;
  align-self: center;
  cursor: pointer;
  @media (min-width: 768px) {
    width: 120px;
    font-size: 16px;
  }
  @media (min-width: 1025px) {
    width: 150px;
    font-size: 20px;
  }
`

const Input = styled.input`
  margin: 10px 0 10px;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0px 5px 6px #d3d3d3;
  border: 1px solid #66bfa6;
  width: 80%;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
`
