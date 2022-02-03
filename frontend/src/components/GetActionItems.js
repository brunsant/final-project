import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"

import { ACTION_PLAN_URL } from "../utils/constants"

const GetActionItems = () => {
  const [actionItems, setActionItems] = useState([])

  const retroId = useSelector((store) => store.retro._id)

  useEffect(() => {
    fetch(ACTION_PLAN_URL(`${retroId}`))
      .then((res) => res.json())
      .then((data) => setActionItems(data))
  }, [retroId])

  return (
    <>
      <h1> Action Plan </h1>
      <Container>
        <Box>
          {actionItems.map((item) => (
            <p key={item._id}>
              {item.description} - {item.name}
            </p>
          ))}
        </Box>
      </Container>
    </>
  )
}

export default GetActionItems

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
