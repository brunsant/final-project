import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { ACTION_PLAN_URL } from "../utils/constants";

const GetActionItems = () => {
  const [actionItems, setActionItems] = useState([]);

  const retroId = useSelector((store) => store.retro._id);

  useEffect(() => {
    fetch(ACTION_PLAN_URL(`${retroId}`))
      .then((res) => res.json())
      .then((data) => setActionItems(data));
  }, [retroId]);

  return (
    <>
      <HeaderTitle> Action Plan </HeaderTitle>
      <Container>
        <Box>
          {actionItems.map((item) => (
            <Action>
              <Text key={item._id}>{item.description}</Text>
              <Text>{item.name}</Text>
            </Action>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default GetActionItems;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
  width: 100%;
  background-color: white;
`;

const Action = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
  border: 2px solid #66bfa6;
  margin: 5px 0;
`;

const Box = styled.div`
  width: 80%;
  /* border: 2px solid #66bfa6; */
  /* text-align: center; */
`;
const HeaderTitle = styled.h2`
  font-size: 20px;
  text-align: center;
  margin-bottom: 10px;
  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

const Text = styled.p`
  margin: 5px 10px;
`;
