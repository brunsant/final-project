import React from "react"
import Navbar from "./Navbar"
import styled from "styled-components"

const Header = () => {
  return (
    <HeaderContainer>
      <Title> RETRO</Title>
      <Navbar />
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(
    to right,
    #66bfa6,
    #39becc,
    #4db8ea,
    #90aaf1,
    #cc98dc
  );
  min-height: 70px;
`

const Title = styled.h1`
  font-size: 32px;
  padding: 0 20px;

  @media (min-width: 768px) {
    font-size: 42px;
  }
`
