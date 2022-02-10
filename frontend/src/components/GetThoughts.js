import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { THOUGHT_URL, DELETE_THOUGHTS } from "../utils/constants";

import { CloseIcon } from "@chakra-ui/icons";
import swal from "sweetalert";
import styled from "styled-components";

const GetThoughts = () => {
  const [retroThoughts, setRetroThoughts] = useState([]);

  const retroId = useSelector((store) => store.retro._id);

  useEffect(() => {
    fetchThoughts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retroId]);

  const fetchThoughts = () => {
    fetch(THOUGHT_URL(`${retroId}`))
      .then((res) => res.json())
      .then((data) => setRetroThoughts(data));
  };

  const add = retroThoughts.filter((item) => item.category === "Add");
  const drop = retroThoughts.filter((item) => item.category === "Drop");
  const keep = retroThoughts.filter((item) => item.category === "Keep");
  const improve = retroThoughts.filter((item) => item.category === "Improve");

  const RefreshButton = () => {
    window.location.reload("Refresh");
  };

  const onDeleteClick = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you won't be able to recover this thought",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const options = {
          method: "DELETE",
        };
        fetch(DELETE_THOUGHTS(`${id}`), options);
        swal("Your thought has been deleted", {
          icon: "success",
        }).then(RefreshButton);
      } else {
        swal("Your thought is safe");
      }
    });
  };

  return (
    <>
      <HeaderTitle> THOUGHTS </HeaderTitle>

      <Container>
        <Box>
          <Title>Add</Title>
          {add.map((item) => (
            <ThoughtItem>
              <Thoughts key={item._id}>{item.description}</Thoughts>
              <CloseIcon
                w={3}
                h={3}
                color="#66bfa6"
                onClick={() => onDeleteClick(item._id)}
              />{" "}
            </ThoughtItem>
          ))}
        </Box>
        <Box>
          <Title>Drop</Title>
          {drop.map((item) => (
            <ThoughtItem>
              <Thoughts key={item._id}>{item.description}</Thoughts>
              <CloseIcon
                w={3}
                h={3}
                color="#66bfa6"
                onClick={() => onDeleteClick(item._id)}
              />{" "}
            </ThoughtItem>
          ))}
        </Box>
        <Box>
          <Title>Keep</Title>
          {keep.map((item) => (
            <ThoughtItem>
              <Thoughts key={item._id}>{item.description}</Thoughts>
              <CloseIcon
                w={3}
                h={3}
                color="#66bfa6"
                onClick={() => onDeleteClick(item._id)}
              />{" "}
            </ThoughtItem>
          ))}
        </Box>
        <Box>
          <Title>Improve</Title>
          {improve.map((item) => (
            <ThoughtItem>
              <Thoughts key={item._id}>{item.description}</Thoughts>
              <CloseIcon
                w={3}
                h={3}
                color="#66bfa6"
                onClick={() => onDeleteClick(item._id)}
              />{" "}
            </ThoughtItem>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default GetThoughts;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  width: 100%;
  padding-top: 20px;

  @media (min-width: 1025px) {
    margin: 0 20px;
    gap: 50px;
  }
`;

const Box = styled.div`
  width: 49%;
  min-height: 200px;
  border: 2px solid #66bfa6;
  text-align: center;

  @media (min-width: 1025px) {
    width: 35%;
  }
`;

const Title = styled.h5`
  background-color: #66bfa6;
  color: white;

  @media (min-width: 1025px) {
    font-size: 25px;
  }
`;
const HeaderTitle = styled.h2`
  font-size: 22px;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

const ThoughtItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #66bfa6;
  padding: 0 10px;
`;

const Thoughts = styled.p`
  @media (min-width: 1025px) {
    font-size: 22px;
  }
`;
