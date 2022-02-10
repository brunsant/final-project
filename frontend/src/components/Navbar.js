import React, { useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import user from "../reducers/user";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import styled from "styled-components";

const Header = () => {
  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutUser = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setAccessToken(null));

      localStorage.removeItem("user");
    });
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken, navigate]);

  return (
    <>
      {/* mobile & tablet hamburger menu */}
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
            <MenuItem>
              <Link to="/aboutus">About us</Link>
            </MenuItem>
            <MenuItem onClick={logOutUser}>Log out</MenuItem>
          </MenuList>
        </Menu>
      </HamburgerContainer>
      {/* desktop buttons */}
      <ButtonsContainer>
        <LinkButton>
          <Link to="/">Main</Link>
        </LinkButton>
        <LinkButton>
          <Link to="/profilepage">Profile</Link>
        </LinkButton>
        <LinkButton>
          <Link to="/aboutus">About us</Link>
        </LinkButton>
        <LinkButton onClick={logOutUser}>Log out</LinkButton>
      </ButtonsContainer>
    </>
  );
};

export default Header;

const HamburgerContainer = styled.div`
  @media (min-width: 1025px) {
    display: none;
  }
`;

const LinkButton = styled.span`
  width: 100px;
  padding: 5px;
  margin: 20px;
  color: whitesmoke;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-family: "Roboto", sans-serif;

  &:hover {
    text-decoration: underline;
  }

  @media (min-width: 1025px) {
    font-size: 18px;
  }
`;
const ButtonsContainer = styled.div`
  display: none;

  @media (min-width: 1025px) {
    display: block;
  }
`;
