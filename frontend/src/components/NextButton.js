import React from "react";
import { Link } from "react-router-dom";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

import styled from "styled-components";

const NextButton = ({
  buttonText,
  confirmationText,
  dialogText,
  linkNextPage,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  return (
    <ChakraButton type="submit">
      <Button
        colorScheme="orange"
        variant="solid"
        color={"white"}
        onClick={() => setIsOpen(true)}
      >
        {buttonText}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {buttonText}
            </AlertDialogHeader>

            <AlertDialogBody>{confirmationText}</AlertDialogBody>
            <AlertDialogBody>{dialogText}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="orange" onClick={onClose} ml={3}>
                <Link to={linkNextPage}>{buttonText}</Link>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </ChakraButton>
  );
};

export default NextButton;

const ChakraButton = styled.div`
  display: flex;
  justify-content: right;
  align-self: right;
  padding: 5px;
  margin: 0 7% 0 0;
  cursor: pointer;
`;
