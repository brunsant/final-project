import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { ACTION_PLAN_URL, DELETE_ACTION } from "../utils/constants";

import styled from "styled-components";
import swal from "sweetalert";
import { CloseIcon } from "@chakra-ui/icons";

const GetActionItems = () => {
  const [actionItems, setActionItems] = useState([]);

  const retroId = useSelector((store) => store.retro._id);

  useEffect(() => {
    fetch(ACTION_PLAN_URL(`${retroId}`))
      .then((res) => res.json())
      .then((data) => setActionItems(data));
  }, [retroId]);

  const RefreshButton = () => {
    window.location.reload("Refresh");
  };

  const onDeleteClick = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you won't be able to recover this action",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const options = {
          method: "DELETE",
        };
        fetch(DELETE_ACTION(`${id}`), options);
        swal("Your action has been deleted", {
          icon: "success",
        }).then(RefreshButton);
      } else {
        swal("Your action is safe");
      }
    });
  };

  return (
    <>
      <Container>
        {actionItems.map((item) => (
          <ItemContainer>
            <Action key={item._id}>
              <Text>{item.description}</Text>
              <Text>{item.name}</Text>
            </Action>
            <CloseIcon
              w={4}
              h={4}
              color="#66bfa6"
              onClick={() => onDeleteClick(item._id)}
            />
          </ItemContainer>
        ))}
      </Container>
    </>
  );
};

export default GetActionItems;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
  width: 100%;

  @media (min-width: 1025px) {
    width: 100%;
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
  word-wrap: break-word;
`;

const Text = styled.p`
  margin: 5px 10px;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
