import React from "react"
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

const NextButton = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()

  return (
    <ChakraButton type="submit">
      <Button
        colorScheme="orange"
        variant="solid"
        color={"white"}
        onClick={() => setIsOpen(true)}
      >
        Go to next
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Go to next
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure?</AlertDialogBody>
            <AlertDialogBody>
              Check if your team is ready to procced.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="orange" onClick={onClose} ml={3}>
                <Link to="/actionitems">Go to next</Link>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </ChakraButton>
  )
}

export default NextButton

const ChakraButton = styled.button`
  display: flex;
  justify-content: right;
  align-self: right;
  padding: 5px;
  color: white;
  margin: 0 7% 0 0;
  cursor: pointer;
`
