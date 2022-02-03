import React, { useState } from "react"
import { ACTION_PLAN_URL } from "../utils/constants"
import { useSelector } from "react-redux"

import styled from "styled-components"

const AddActionItems = () => {
  const [newAction, setNewAction] = useState("")
  const [name, setName] = useState("")

  const retroId = useSelector((store) => store.retro)
  // console.log("RETRO ID Thought", retroId)

  const RefreshButton = () => {
    window.location.reload("Refresh")
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: newAction,
        name,
        retro: retroId._id,
      }),
    }
    fetch(ACTION_PLAN_URL(`${retroId._id}`), options)
      .then((res) => res.json())
      .then((data) => setNewAction(data))
      .finally(() => setNewAction(""), setName(""))
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <Input
          required
          type="text"
          value={newAction}
          onChange={(e) => setNewAction(e.target.value)}
          placeholder="Add your action here!"
        ></Input>
        <Input
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add the reponsable here!"
        ></Input>
        <SubmitButton onClick={RefreshButton} type="submit">
          Post
        </SubmitButton>
      </form>
    </>
  )
}

export default AddActionItems

const Input = styled.input`
  padding: 20px;
  border-radius: 5px;
  margin-left: 17px;
`

const SubmitButton = styled.button`
  padding: 10px;
  margin: 20px;
  border-radius: 15px;
  border: none;
  background-color: white;
  box-shadow: 0px 8px 15px gray;
  transition: all 0.3s ease 0s;
  cursor: pointer;
`
