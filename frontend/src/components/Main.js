import React, { useEffect, useState } from "react"
import { useSelector, useDispatch, batch } from "react-redux"
import Header from "./Header"

import { API_URL } from "../utils/constants"
// import user from "../reducers/user"
import retro from "../reducers/retro"
import { WithContext as ReactTags } from "react-tag-input"
import styled from "styled-components"
import ActiveRetro from "./ActiveRetro"

export const Main = () => {
  const [description, setDescription] = useState("")
  const [participants, setParticipants] = useState([])
  const [userList, setUserList] = useState("")

  const userId = useSelector((store) => store.user.userId)

  const RefreshButton = () => {
    window.location.reload("Refresh")
  }

  const dispatch = useDispatch()

  const onFormSubmit = (event) => {
    event.preventDefault()
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description,
        admin: userId,
        participants,
        active: true,
      }),
    }

    fetch(API_URL("retros"), options)
      .then((res) => res.json())
      .then((data) => {
        console.log("RETRO DATA", data)
        if (data.success) {
          batch(() => {
            dispatch(retro.actions.setRetroId(data.response._id))
            dispatch(retro.actions.setDescription(data.response.description))
            dispatch(retro.actions.setAdmin(data.response.admin))
            dispatch(retro.actions.setParticipants(data.response.participants))
            dispatch(retro.actions.setActive(true))
            dispatch(retro.actions.setError(null))
          })
        } else {
          batch(() => {
            dispatch(retro.actions.setDescription(null))
            dispatch(retro.actions.setAdmin(null))
            dispatch(retro.actions.setParticipants(null))
            dispatch(retro.actions.setError(data.response))
          })
        }
      })
  }

  useEffect(() => {
    fetch(API_URL("users"))
      .then((res) => res.json())
      .then((data) => setUserList(data.response))
  }, [])

  // console.log("USERS", userList)

  // const suggestions = participants.map((item) => {
  //   return {
  //     id: userId,
  //     text: userId.username,
  //   }
  // })

  const KeyCodes = {
    comma: 188,
    enter: 13,
  }

  const delimiters = [KeyCodes.comma, KeyCodes.enter]

  const handleDelete = (i) => {
    setParticipants(participants.filter((tag, index) => index !== i))
  }

  const handleAddition = (tag) => {
    const addUser = userList.find((user) => user.username === tag.text)

    if (addUser) {
      setParticipants([...participants, tag])
    } else {
      alert("Invalid username")
    }
  }

  const handleDrag = (tag, currPos, newPos) => {
    const newParticipants = participants.slice()

    newParticipants.splice(currPos, 1)
    newParticipants.splice(newPos, 0, tag)

    // re-render
    setParticipants(newParticipants)
  }

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked")
  }
  return (
    <>
      <Header />
      <Container>
        <div>
          <h1> Create your retro here! </h1>
          <Form onSubmit={onFormSubmit}>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Retro Title"
            ></Input>
            <ParticipantContainer>
              <p>Please add your team members</p>
              <ReactTags
                tags={participants}
                placeholder="Press enter to add new member"
                // suggestions={suggestions}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                handleTagClick={handleTagClick}
                inputFieldPosition="top"
                autocomplete
              />
            </ParticipantContainer>

            <SubmitButton onClick={RefreshButton} type="submit">
              Create retro
            </SubmitButton>
          </Form>
        </div>
        <ActiveRetro />
      </Container>
    </>
  )
}

export default Main

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 10%;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 15px 10px;
  border-radius: 10px;

  @media (min-width: 768px) {
    width: 50%;
    padding: 30px 25px;
  }

  @media (min-width: 1025px) {
    width: 20%;
    padding: 30px 25px;
  }
`
const ParticipantContainer = styled.div`
  margin: 20px;
`
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
