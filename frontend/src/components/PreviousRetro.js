import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { RETRO_URL } from "../utils/constants"

import styled from "styled-components"

const PreviousRetro = () => {
  const [userRetro, setUserRetro] = useState([])
  const user = useParams()

  const userId = useSelector((store) => store.user.userId)

  console.log("USERID PROFILE", userId)

  useEffect(() => {
    fetch(RETRO_URL(`${userId._id}`))
      .then((res) => res.json())
      .then((data) => setUserRetro(data.response))
  }, [])
  console.log("RETRO", userRetro)

  if (userRetro.length > 0) {
    return (
      <>
        <h1>Previous Retros</h1>
        <RetroContainer>
          {userRetro.map((item) => (
            <RetroCard key={item._id}>
              <p>{item.description}</p>
            </RetroCard>
          ))}
        </RetroContainer>
      </>
    )
  }
  if (userRetro.length < 1)
    return (
      <>
        <h1>Previous Retros</h1>
        <p>You don't have any retro</p>
      </>
    )
}

export default PreviousRetro

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
