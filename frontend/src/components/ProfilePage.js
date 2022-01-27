import React from "react"
import { useSelector } from "react-redux"
import PreviousRetro from "./PreviousRetro"
import Header from "./Header"

// import styled from "styled-components";

const ProfilePage = () => {
  const userId = useSelector((store) => store.user.userId.username)

  return (
    <>
      <Header />
      <h1>Profile page</h1>
      <p>Hello {userId}</p>
      <PreviousRetro />
    </>
  )
}

export default ProfilePage
