import React, { useEffect, useState } from "react"
import { useSelector, useDispatch, batch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { API_URL } from "../utils/constants"
import user from "../reducers/user"
import retro from "../reducers/retro"

export const Main = () => {
  const [description, setDescription] = useState("")
  const [participants, setParticipants] = useState("")

  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)
  // const userName = useSelector((store) => store.user.username)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logOutUser = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setAccessToken(null))

      localStorage.removeItem("user")
    })
  }

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin")
    }
  }, [accessToken, navigate])

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
      }),
    }

    fetch(API_URL("retros"), options)
      .then((res) => res.json())
      .then((data) => {
        console.log("RETRO DATA", data)
        if (data.success) {
          batch(() => {
            dispatch(retro.actions.setDescription(data.response.description))
            dispatch(retro.actions.setAdmin(data.response.admin))
            dispatch(retro.actions.setParticipants(data.response.participants))
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

  return (
    <>
      <div>
        <h1>Welcome to the sprint retro app..</h1>
        <div className="logout-btn-wrapper">
          <button className="logout-btn" onClick={logOutUser}>
            Log out
          </button>
        </div>

        <div>
          <form onSubmit={onFormSubmit}>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Retro info"
            ></input>
            <input
              type="text"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              placeholder="Add participants"
            ></input>
            <button type="submit">Create retro</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Main
