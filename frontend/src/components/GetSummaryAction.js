import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { ACTION_PLAN_URL } from "../utils/constants";

import styled from "styled-components";

const GetSummaryAction = () => {
  const [actionItems, setActionItems] = useState([]);

  const retroId = useSelector((store) => store.retro._id);

  useEffect(() => {
    fetch(ACTION_PLAN_URL(`${retroId}`))
      .then((res) => res.json())
      .then((data) => setActionItems(data));
  }, [retroId]);

  return (
    <>
      <Container>
        <HeaderTitle>ACTION PLAN</HeaderTitle>
        {actionItems.map((item) => (
          <ItemContainer>
            <Action key={item._id}>
              <Text>{item.description}</Text>
              <Text>{item.name}</Text>
            </Action>
          </ItemContainer>
        ))}
      </Container>
    </>
  );
};

export default GetSummaryAction;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
  width: 100%;
  margin: 20px 0 10px;

  @media (min-width: 768px) {
    width: 60%;
    margin: 40px 0 30px;
  }

  @media (min-width: 1025px) {
    width: 50%;
    margin: 50px 0 40px;
  }
`;

const HeaderTitle = styled.h2`
  font-size: 22px;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

const Action = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
  border: 2px solid #66bfa6;
  margin: 5px 5px 0 0;
  width: 100%;
  background-color: #66bfa6;
  border-radius: 5px;
  border: 1px solid #66bfa6;
`;

const Text = styled.p`
  margin: 5px 10px;

  @media (min-width: 1025px) {
    font-size: 22px;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
