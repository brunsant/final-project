import React, { useState } from "react"
import { THOUGHT_URL } from "../utils/constants"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import retro from "../reducers/retro"
import GroupThoughts from "./GroupThoughts"

// import styled from "styled-components";

const AddThoughts = () => {
  // const location = useLocation()
  // const { from } = location.state

  const [newThought, setNewThought] = useState("")
  const [category, setCategory] = useState("")

  const retroId = useSelector((store) => store.retro)
  // console.log("RETRO ID Thought", retroId)

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
        category,
      }),
    }
    fetch(THOUGHT_URL(`${retroId._id}`), options)
      .then((res) => res.json())
      .then((data) => {
        setNewThought("")
      })
  }

  return (
    <>
      {/* <h4>{retroId.description}</h4> */}
      <p>{retroId._id}</p>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={newThought}
          onChange={(e) => setNewThought(e.target.value)}
          placeholder="Add you thought here!"
        ></input>
        <select onChange={(e) => setCategory(e.target.value)}>
          <option disabled value="">
            Select category
          </option>
          <option value="Drop">Drop</option>
          <option value="Add">Add</option>
          <option value="Keep">Keep</option>
          <option value="Improve">Improve</option>
        </select>
        <button type="submit">Post</button>
      </form>
      <GroupThoughts />
      <button>
        {" "}
        <Link to="/grouping"> Go to next </Link>
      </button>
    </>
  )
}

export default AddThoughts
