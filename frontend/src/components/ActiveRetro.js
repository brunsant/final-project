import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import { RETRO_URL } from "../utils/constants";

import styled from "styled-components";

import retro from "../reducers/retro";

const ActiveRetro = () => {
  const [userRetro, setUserRetro] = useState([]);

  const userId = useSelector((store) => store.user.userId);

  // console.log("RETRO ID ACTIVE RETRO", retroId)

  useEffect(() => {
    fetch(RETRO_URL(`${userId._id}`))
      .then((res) => res.json())
      .then((data) => setUserRetro(data.response));
  }, [userId]);
  console.log("RETRO USE EFFECT", userRetro);

  const dispatch = useDispatch();
  const onButtonClick = (id) => {
    dispatch(retro.actions.setRetroId(id));
  };

  const activeFilter = userRetro.filter((item) => item.active === true);
  // IMPORTANT - display new retro as soon as published without reload
  if (userRetro.length > 0) {
    return (
      <>
        <h1>Active Retros</h1>
        <RetroContainer>
          {activeFilter.map((item) => (
            <RetroCard key={item._id}>
              <p>{item.description}</p>
              <p className="date">
                Created on: {moment(item.createdAt).format("MMM Do YY")}
              </p>
              <Button type="submit" onClick={() => onButtonClick(item._id)}>
                <Link to={"/thoughts"}>Join retro</Link>
              </Button>
            </RetroCard>
          ))}
        </RetroContainer>
      </>
    );
  }

  if (userRetro.length < 1)
    return (
      <>
        <h1>Active Retros</h1>
        <p>You don't have any retro</p>
      </>
    );
};

export default ActiveRetro;

const RetroCard = styled.div`
  width: 250px;
  padding: 15px;
  margin: 20px;
  border-radius: 15px;
  border: none;
  background-color: white;
  box-shadow: 0px 8px 15px gray;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  background-color: lightblue;
  text-align: center;
`;
const RetroContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Button = styled.button`
  width: 100px;
  padding: 15px;
  margin: 20px;
  border-radius: 15px;
  border: none;
  background-color: white;
  box-shadow: 0px 8px 15px gray;
  transition: all 0.3s ease 0s;
  cursor: pointer;
`;
