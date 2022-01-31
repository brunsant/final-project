import React, { useState } from "react"
import { THOUGHT_URL } from "../utils/constants"
import { useSelector } from "react-redux"
// import { useLocation } from "react-router-dom"

// import retro from "../reducers/retro";

// import styled from "styled-components";

const AddThoughts = () => {
  // const location = useLocation()
  // const { from } = location.state

  const [newThought, setNewThought] = useState("")

  const retroId = useSelector((store) => store.retro)
  console.log("RETRO ID Thought", retroId)

  const handleFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: newThought,
        retro: retroId._id,
      }),
    }
    fetch(THOUGHT_URL, options)
      .then((res) => res.json())
      .then((data) => {
        setNewThought("")
      })
  }

  return (
    <>
      <h4>{retroId.description}</h4>
      <p>{retroId._id}</p>
      <form onSubmit={handleFormSubmit}>
        <input
          value={newThought}
          onChange={(e) => setNewThought(e.target.value)}
          placeholder="Add you thought here!"
        ></input>
        <select>
          <option disabled value="">
            Select category
          </option>
          <option>Drop</option>
          <option>Add</option>
          <option>Keep</option>
          <option>Improve</option>
        </select>
        <button type="submit">Post</button>
      </form>
    </>
  )
}

export default AddThoughts
