import React, { useEffect } from "react"
import { useSelector, useDispatch, batch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"

import user from "../reducers/user"

import styled from "styled-components"

const Header = () => {
  const accessToken = useSelector((store) => store.user.accessToken)
  //   const userId = useSelector((store) => store.user.userId)

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

  return (
    <>
      <HamburgerContainer>
        <Menu>
          <MenuButton>
            <HamburgerIcon w={8} h={8} color="black" />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link to="/">Main</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/profilepage">Profile page</Link>
            </MenuItem>
            <MenuItem onClick={logOutUser}>Log out</MenuItem>
          </MenuList>
        </Menu>
      </HamburgerContainer>
      <ButtonsContainer>
        <Button>
          <Link to="/">Main</Link>
        </Button>
        <Button>
          <Link to="/profilepage">Profile page</Link>
        </Button>
        <Button onClick={logOutUser}>Log out</Button>
      </ButtonsContainer>
    </>
  )
}

export default Header

const HamburgerContainer = styled.div`
  @media (min-width: 1025px) {
    display: none;
  }
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
const ButtonsContainer = styled.div`
  display: none;

  @media (min-width: 1025px) {
    display: block;
  }
`
