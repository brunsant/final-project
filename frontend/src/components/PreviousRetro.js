import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
// import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"
import moment from "moment"
import retro from "../reducers/retro"
import { RETRO_URL } from "../utils/constants"

import styled from "styled-components"

const PreviousRetro = () => {
  const [userRetro, setUserRetro] = useState([])
  // const [status, setStatus] = useState("")

  const userId = useSelector((store) => store.user.userId)

  useEffect(() => {
    fetch(RETRO_URL(`${userId._id}`))
      .then((res) => res.json())
      .then((data) => setUserRetro(data.response))
  }, [userId])
  // console.log("RETRO", userRetro)

  const inactiveFilter = userRetro.filter((item) => item.active === false)

  const dispatch = useDispatch()

  const onButtonClick = (id) => {
    dispatch(retro.actions.setRetroId(id))
  }

  // const retroId = useSelector((store) => store.retro.retroId)

  // const handleDelete = () => {
  //   // DELETE request using fetch inside useEffect React hook
  //   fetch(DELETE_RETRO(`${retroId}`, { method: "DELETE" })).then(() =>
  //     setStatus("Delete successful")
  //   )
  //   // empty dependency array means this effect will only run once (like componentDidMount in classes)
  // }

  if (inactiveFilter.length > 0) {
    return (
      <>
        <h1>Previous Retros</h1>
        <RetroContainer>
          {inactiveFilter.map((item) => (
            <RetroCard key={item._id}>
              <button>x</button>

              <p>{item.description}</p>
              <p className="date">
                Created on: {moment(item.createdAt).format("MMM Do YY")}
              </p>
              <Button type="submit" onClick={() => onButtonClick(item._id)}>
                <Link to={"/summary"}>View summary</Link>
              </Button>
            </RetroCard>
          ))}
        </RetroContainer>
      </>
    )
  }
  if (inactiveFilter < 1)
    return (
      <EmptyState>
        <Text>You don't have any retro yet..</Text>
        <Image
          src="profileimage.png"
          alt="Illustration of a person at a computer desk"
        />
      </EmptyState>
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
const Button = styled.button`
  width: 150px;
  padding: 15px;
  margin: 20px;
  border-radius: 15px;
  border: none;
  background-color: white;
  box-shadow: 0px 8px 15px gray;
  transition: all 0.3s ease 0s;
  cursor: pointer;
`
const EmptyState = styled.div`
  display: flex;
  justify-contente: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
`

const Image = styled.img`
  width: 250px;
  height: 250px;

  @media (min-width: 768px) {
    width: 400px;
    height: 400px;
  }

  @media (min-width: 1025px) {
    width: 450px;
    height: 450px;
  }
`
const Text = styled.p`
  font-size: 18px;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    font-size: 25px;
    margin-bottom: 30px;
  }

  @media (min-width: 1025px) {
    font-size: 32px;
  }
`
