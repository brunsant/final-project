import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"

import { THOUGHT_URL } from "../utils/constants"

const GetThoughts = () => {
  const [retroThoughts, setRetroThoughts] = useState([])

  const retroId = useSelector((store) => store.retro._id)
  // console.log("RETRO ID THOUGHTS", retroId);

  useEffect(() => {
    fetch(THOUGHT_URL(`${retroId}`))
      .then((res) => res.json())
      .then((data) => setRetroThoughts(data))
  }, [retroId])
  // console.log("GET RETRO THOUGHTS!!!!", retroThoughts);

  const add = retroThoughts.filter((item) => item.category === "Add")
  const drop = retroThoughts.filter((item) => item.category === "Drop")
  const keep = retroThoughts.filter((item) => item.category === "Keep")
  const improve = retroThoughts.filter((item) => item.category === "Improve")

  return (
    <>
      <h1> THOUGHTS </h1>
      <Container>
        <Box>
          <h5>Add</h5>
          {add.map((item) => (
            <p key={item._id}>{item.description}</p>
          ))}
        </Box>
        <Box>
          <h5>Drop</h5>
          {drop.map((item) => (
            <p key={item._id}>{item.description}</p>
          ))}
        </Box>
        <Box>
          <h5>Keep</h5>
          {keep.map((item) => (
            <p key={item._id}>{item.description}</p>
          ))}
        </Box>
        <Box>
          <h5>Improve</h5>
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
  gap: 5px;
  width: 100%;
`

const Box = styled.div`
  width: 49%;
  border: 1px solid lightblue;
  text-align: center;
`
