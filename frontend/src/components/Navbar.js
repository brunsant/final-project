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
            <HamburgerIcon w={9} h={9} color="white" />
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
        <LinkButton>
          <Link to="/">Main</Link>
        </LinkButton>
        <LinkButton>
          <Link to="/profilepage">Profile</Link>
        </LinkButton>
        <LinkButton onClick={logOutUser}>Log out</LinkButton>
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

const LinkButton = styled.span`
  width: 100px;
  padding: 5px;
  margin: 20px;
  color: white;
  font-weight: 700;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
const ButtonsContainer = styled.div`
  display: none;

  @media (min-width: 1025px) {
    display: block;
  }
`
