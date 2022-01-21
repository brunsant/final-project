import React, { useEffect } from "react"
import { useSelector, useDispatch, batch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { API_URL } from "../utils/constants"
import user from "../reducers/user"
import retro from "../reducers/retro"

const Main = () => {
  const thoughtsItems = useSelector((store) => store.retro.items)
  const accessToken = useSelector((store) => store.user.accessToken)

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

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    }

    fetch(API_URL("retro"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(retro.actions.setItems(data.response))
          dispatch(retro.actions.setError(null))
        } else {
          dispatch(retro.actions.setItems([]))
          dispatch(retro.actions.setError(data.response))
        }
      })
  }, [accessToken, dispatch])

  return (
    <>
      <div>
        <h1>welcome to the chamber of secrets..</h1>
        {thoughtsItems.map((item) => (
          <div key={item._id}>{item.message}</div>
        ))}
      </div>
      <div className="logout-btn-wrapper">
        <button className="logout-btn" onClick={logOutUser}>
          Log out
        </button>
      </div>
    </>
  )
}

export default Main
