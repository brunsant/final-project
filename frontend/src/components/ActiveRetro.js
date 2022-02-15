import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import retro from "../reducers/retro";

import { RETRO_URL } from "../utils/constants";

import moment from "moment";
import styled from "styled-components";

const ActiveRetro = () => {
  const [userRetro, setUserRetro] = useState([]);

  const userId = useSelector((store) => store.user.userId);
  console.log("USER ID ACTIVE RETRO", userId);

  useEffect(() => {
    fetch(RETRO_URL(`${userId}`))
      .then((res) => res.json())
      .then((data) => setUserRetro(data.response));
  }, [userId]);

  console.log("USER RETRO", userRetro);

  const dispatch = useDispatch();
  const onButtonClick = (id) => {
    dispatch(retro.actions.setRetroId(id));
  };

  const activeFilter = userRetro.filter((item) => item.active === true);
  if (activeFilter.length > 0) {
    return (
      <ActiveRetroContainer>
        <HeaderTitle>ACTIVE RETROS</HeaderTitle>
        <RetroContainer>
          {activeFilter.map((item) => (
            <RetroCard key={item._id}>
              <RetroName>{item.description}</RetroName>
              <p className="date">
                Created on: {moment(item.createdAt).format("MMM Do YY")}
              </p>
              <Button type="submit" onClick={() => onButtonClick(item._id)}>
                <Link to={"/thoughts"}>Join retro</Link>
              </Button>
            </RetroCard>
          ))}
        </RetroContainer>
      </ActiveRetroContainer>
    );
  }

  if (activeFilter.length < 1)
    return (
      <ActiveRetroContainer>
        <HeaderTitle>Active Retros</HeaderTitle>
        <Text>You don't have any active retro at the moment</Text>
        <Image
          src="activeretro.svg"
          alt="illustration of a group of people planning on a board"
        />
      </ActiveRetroContainer>
    );
};

export default ActiveRetro;

const ActiveRetroContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 1025px) {
    width: 100%;
    max-width: 600px;
    min-height: 550px;
    margin: 0;
    border: 2px solid #66bfa6;
    border-top-left-radius: 0;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 0;
    border-top-right-radius: 5px;
    border-left: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const RetroCard = styled.div`
  width: 350px;
  padding: 15px;
  margin: 20px;
  border-radius: 15px;
  border: 1px solid #66bfa6;
  background-image: linear-gradient(
    to right,
    #66bfa6,
    #5cbdb1,
    #58bbbb,
    #5ab8c3,
    #61b4c9
  );
  box-shadow: 0px 5px 6px #d3d3d3;
  cursor: pointer;
  text-align: center;

  @media (min-width: 768px) {
    width: 300px;
  }

  @media (min-width: 1025px) {
    width: 300px;
  }
`;

const RetroContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const HeaderTitle = styled.h2`
  font-size: 22px;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

const Button = styled.button`
  width: 80px;
  font-size: 12px;
  padding: 5px;
  color: #66bfa6;
  margin: 5px;
  border-radius: 5px;
  border: none;
  background-color: white;
  box-shadow: 0px 5px 6px #66bfa6;
  cursor: pointer;

  @media (min-width: 768px) {
    width: 120px;
    font-size: 16px;
  }
`;

const RetroName = styled.p`
  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

const Text = styled.p`
  font-size: 14px;
  margin: 10px 80px 0;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  align-self: center;

  @media (min-width: 768px) {
    width: 450px;
    height: 450px;
  }
`;
