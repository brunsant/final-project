import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import { THOUGHT_RETRO_URL } from "../utils/constants"

import styled from "styled-components"

import retro from "../reducers/retro"

const GroupThoughts = () => {
  const [retroThoughts, setRetroThoughts] = useState([])

  const retroId = useSelector((store) => store.retro._id)
  console.log("RETRO ID THOUGHTS", retroId)

  useEffect(() => {
    const options = {
      method: "GET",
    }

    fetch(THOUGHT_RETRO_URL(`${retroId}`), options)
      .then((res) => res.json())
      .then((data) => setRetroThoughts(data.response))
  }, [retroId])
  console.log("RETRO USE EFFECT", retroThoughts)

  //   const dispatch = useDispatch()
  //   const onButtonClick = (id) => {
  //     dispatch(retro.actions.setRetroId(id))
  //   }

  // IMPORTANT - display new retro as soon as published without reload
  return (
    <>
      <h1> THOUGHTS </h1>
      {/* {retroThoughts.map((item) => (
        <p>{item.description}</p>
      ))} */}
    </>
  )
}

{
  /* <RetroContainer>
          {userRetro.map((item) => (
            <RetroCard key={item._id}>
              <p>{item.description}</p>
              <p>{item._id}</p>
              <Button type="submit" onClick={() => onButtonClick(item._id)}>
                <Link to={"/thoughts"}>Join retro </Link>
              </Button>
            </RetroCard>
          ))}
        </RetroContainer> */
}

export default GroupThoughts

const RetroCard = styled.div`
  width: 250px;
  padding: 15px;
  margin: 20px;
  border-radius: 15px;
  border: none;
  background-color: white;
  box-shadow: 0px 8px 15px gray;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  background-color: lightblue;
  text-align: center;
`
const RetroContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Button = styled.button`
  width: 100px;
  padding: 15px;
  margin: 20px;
  border-radius: 15px;
  border: none;
  background-color: white;
  box-shadow: 0px 8px 15px gray;
  transition: all 0.3s ease 0s;
  cursor: pointer;
`
