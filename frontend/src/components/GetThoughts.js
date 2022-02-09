import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"

import { THOUGHT_URL } from "../utils/constants"

const GetThoughts = () => {
  const [retroThoughts, setRetroThoughts] = useState([])

  const retroId = useSelector((store) => store.retro._id)
  // console.log("RETRO ID THOUGHTS", retroId);

  useEffect(() => {
    fetchThoughts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retroId])

  const fetchThoughts = () => {
    fetch(THOUGHT_URL(`${retroId}`))
      .then((res) => res.json())
      .then((data) => setRetroThoughts(data))
  }
  // console.log("GET RETRO THOUGHTS!!!!", retroThoughts);

  const add = retroThoughts.filter((item) => item.category === "Add")
  const drop = retroThoughts.filter((item) => item.category === "Drop")
  const keep = retroThoughts.filter((item) => item.category === "Keep")
  const improve = retroThoughts.filter((item) => item.category === "Improve")

  return (
    <>
      <HeaderTitle> THOUGHTS </HeaderTitle>

      <Container>
        <Box>
          <Title>Add</Title>
          {add.map((item) => (
            <p key={item._id}>{item.description}</p>
          ))}
        </Box>
        <Box>
          <Title>Drop</Title>
          {drop.map((item) => (
            <p key={item._id}>{item.description}</p>
          ))}
        </Box>
        <Box>
          <Title>Keep</Title>
          {keep.map((item) => (
            <p key={item._id}>{item.description}</p>
          ))}
        </Box>
        <Box>
          <Title>Improve</Title>
          {improve.map((item) => (
            <p key={item._id}>{item.description}</p>
          ))}
        </Box>
      </Container>
    </>
  )
}

export default GetThoughts

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  width: 100%;
  padding-top: 20px;

  @media (min-width: 1025px) {
    margin: 0 20px;
    gap: 50px;
  }
`

const Box = styled.div`
  width: 49%;
  min-height: 200px;
  border: 2px solid #66bfa6;
  text-align: center;

  @media (min-width: 1025px) {
    width: 35%;
  }
`

const Title = styled.h5`
  background-color: #66bfa6;
  color: white;
  font-weight: bold;

  @media (min-width: 1025px) {
    font-size: 25px;
  }
`
const HeaderTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 28px;
  }
`
