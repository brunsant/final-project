import React from "react"
import { useSelector } from "react-redux"
import PreviousRetro from "../components/PreviousRetro"
import Header from "../components/Header"

import styled from "styled-components"

const ProfilePage = () => {
  const userId = useSelector((store) => store.user.userId.username)

  const nameCapitalized = userId.charAt(0).toUpperCase() + userId.slice(1)

  return (
    <>
      <Header />
      <Title>Hello {nameCapitalized}!</Title>
      <PreviousRetro />
    </>
  )
}

export default ProfilePage

const Title = styled.h2`
  font-size: 25px;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 30px;
    margin-top: 50px;
  }

  @media (min-width: 1025px) {
    font-size: 36px;
  }
`
