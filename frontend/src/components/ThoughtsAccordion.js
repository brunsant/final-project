import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"

import { THOUGHT_URL } from "../utils/constants"

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react"

import styled from "styled-components"

const GetThoughts = () => {
  const [retroThoughts, setRetroThoughts] = useState([])

  const retroId = useSelector((store) => store.retro._id)

  useEffect(() => {
    fetchThoughts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retroId])

  const fetchThoughts = () => {
    fetch(THOUGHT_URL(`${retroId}`))
      .then((res) => res.json())
      .then((data) => setRetroThoughts(data))
  }

  const add = retroThoughts.filter((item) => item.category === "Add")
  const drop = retroThoughts.filter((item) => item.category === "Drop")
  const keep = retroThoughts.filter((item) => item.category === "Keep")
  const improve = retroThoughts.filter((item) => item.category === "Improve")

  return (
    <ThoughtsAccordion>
      <HeaderTitle>THOUGHTS COLLECTION</HeaderTitle>
      <Accordion allowToggle allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: "#66BFA6", color: "white" }}>
              <Box flex="1" textAlign="left">
                Add
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          {add.map((item) => (
            <AccordionPanel key={item._id}>
              <p>{item.description}</p>
            </AccordionPanel>
          ))}
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: "#66BFA6", color: "white" }}>
              <Box flex="1" textAlign="left">
                Drop
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          {drop.map((item) => (
            <AccordionPanel key={item._id}>
              <p>{item.description}</p>
            </AccordionPanel>
          ))}
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: "#66BFA6", color: "white" }}>
              <Box flex="1" textAlign="left">
                Keep
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          {keep.map((item) => (
            <AccordionPanel key={item._id}>
              <p>{item.description}</p>
            </AccordionPanel>
          ))}
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: "#66BFA6", color: "white" }}>
              <Box flex="1" textAlign="left">
                Improve
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          {improve.map((item) => (
            <AccordionPanel key={item._id}>
              <p>{item.description}</p>
            </AccordionPanel>
          ))}
        </AccordionItem>
      </Accordion>
    </ThoughtsAccordion>
  )
}

export default GetThoughts

const ThoughtsAccordion = styled.div`
  margin: 10px 30px 20px;

  @media (min-width: 1025px) {
    width: 80%;
    margin: 10px 0px 0 0;
    justify-self: center;
    background-color: white;
  }
`

const HeaderTitle = styled.h2`
  font-size: 20px;
  text-align: center;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    font-size: 28px;
  }
`
