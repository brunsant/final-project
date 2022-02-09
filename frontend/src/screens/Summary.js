import React from "react"
import Header from "../components/Header"
import { Link } from "react-router-dom"
import GetThoughts from "../components/GetThoughts"
import GetActionItems from "../components/GetActionItems"

import styled from "styled-components"

const Summary = () => {
  return (
    <>
      <Header />
      <SummaryContainer>
        <GetThoughts />
        <GetActionItems />
        <SubmitButton>
          <Link to="/"> Back to main </Link>
        </SubmitButton>
      </SummaryContainer>
    </>
  )
}

export default Summary

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 30px;
`

const SubmitButton = styled.button`
  width: 130px;
  font-size: 16px;
  padding: 5px;
  color: white;
  margin: 5px;
  border-radius: 5px;
  border: none;
  align-self: center;
  background-color: #66bfa6;
  box-shadow: 0px 5px 6px #d3d3d3;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  @media (min-width: 768px) {
    width: 120px;
    font-size: 16px;
  }
  @media (min-width: 1025px) {
    width: 150px;
    font-size: 20px;
  }
`
