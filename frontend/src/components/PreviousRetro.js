import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
import retro from "../reducers/retro";
import { RETRO_URL } from "../utils/constants";

import styled from "styled-components";

const PreviousRetro = () => {
  const [userRetro, setUserRetro] = useState([]);
  // const [status, setStatus] = useState("")

  const userId = useSelector((store) => store.user.userId);

  useEffect(() => {
    fetch(RETRO_URL(`${userId._id}`))
      .then((res) => res.json())
      .then((data) => setUserRetro(data.response));
  }, [userId]);

  const inactiveFilter = userRetro.filter((item) => item.active === false);

  const findRetro = userRetro.filter((item) => item._id);
  console.log("ID", findRetro);

  const dispatch = useDispatch();

  const onButtonClick = (id) => {
    dispatch(retro.actions.setRetroId(id));
  };

  // const retroId = useSelector((store) => store.retro.retroId);
  // console.log("RETROID", retroId.id);

  // const handleDelete = () => {
  //   // DELETE request using fetch inside useEffect React hook
  //   fetch(DELETE_RETRO(`${retroId}`, { method: "DELETE" })).then(() =>

  //   )
  //   // empty dependency array means this effect will only run once (like componentDidMount in classes)
  // }

  if (inactiveFilter.length > 0) {
    return (
      <PreviousRetroContainer>
        <Title>Previous Retros</Title>
        <RetroContainer>
          {inactiveFilter.map((item) => (
            <RetroCard key={item._id}>
              <button>x</button>
              <TextTitle>{item.description}</TextTitle>
              <Text>
                Created on: {moment(item.createdAt).format("MMM Do YY")}
              </Text>
              <Button type="submit" onClick={() => onButtonClick(item._id)}>
                <Link to={"/summary"}>Summary</Link>
              </Button>
            </RetroCard>
          ))}
        </RetroContainer>
      </PreviousRetroContainer>
    );
  }
  if (inactiveFilter < 1)
    return (
      <EmptyState>
        <TextTitle>You don't have any retro yet..</TextTitle>
        <Image
          src="profileimage.png"
          alt="Illustration of a person at a computer desk"
        />
      </EmptyState>
    );
};

export default PreviousRetro;

const PreviousRetroContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RetroCard = styled.div`
  width: 250px;
  padding: 15px;
  margin: 20px;
  border-radius: 15px;
  border: 1px solid #66bfa6;
  background-color: white;
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
const Button = styled.button`
  width: 80px;
  font-size: 12px;
  padding: 5px;
  color: white;
  margin: 5px;
  border-radius: 15px;
  border: none;
  background-color: #66bfa6;
  box-shadow: 0px 5px 6px #d3d3d3;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  @media (min-width: 768px) {
    width: 120px;
    font-size: 16px;
  }
`;
const EmptyState = styled.div`
  display: flex;
  justify-contente: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
  width: 100%;
`;

const Image = styled.img`
  width: 250px;
  height: 250px;

  @media (min-width: 768px) {
    width: 450px;
    height: 450px;
  }

  @media (min-width: 1025px) {
    display: none;
  }
`;
const Text = styled.p`
  font-size: 12px;
  margin-bottom: 7px;

  @media (min-width: 768px) {
    font-size: 18px;
    margin-bottom: 10px;
  }

  @media (min-width: 1025px) {
    font-size: 20px;
  }
`;

const TextTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 7px;
  @media (min-width: 768px) {
    font-size: 25px;
    margin-bottom: 10px;
  }

  @media (min-width: 1025px) {
    font-size: 26px;
    margin-top: 100px;
  }
`;

const Title = styled.div`
  text-align: center;
  font-size: 20px;
  margin-top: 30px;
  @media (min-width: 768px) {
    font-size: 26px;
    margin-bottom: 30px;
  }
`;
