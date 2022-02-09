import React from "react"
import Navbar from "./Navbar"
import styled from "styled-components"

const Header = () => {
  return (
    <HeaderContainer>
      <Image src="logo.svg" alt="logo" />
      <Title>TEAM RETRO</Title>
      <Navbar />
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: #16a795; */
  background-image: linear-gradient(
    to right,
    #16a795,
    #21aba6,
    #35aeb4,
    #4bb1c0,
    #61b4c9
  );
  min-height: 70px;
  padding-right: 20px;
`

const Title = styled.h1`
  font-size: 32px;
  padding: 0 20px;
  color: white;

  @media (min-width: 768px) {
    font-size: 42px;
    color: white;
  }
`

const Image = styled.img`
  width: 50px;
  height: 50px;
  margin: 10px 0 0 10px;
  @media (min-width: 768px) {
    width: 80px;
    height: 80px;
    margin: 10px 0 0 10px;
  }
  @media (min-width: 1025px) {
    width: 100px;
    height: 100px;
    margin: 10px 0 0 20px;
  }
`
