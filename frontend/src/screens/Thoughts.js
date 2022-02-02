import React from "react";
import Header from "../components/Header";
import AddThoughts from "../components/AddThoughts";
import GetThoughts from "../components/GetThoughts";

// import styled from "styled-components";

const Thoughts = () => {
  return (
    <>
      <Header />
      <GetThoughts />
      <AddThoughts />
    </>
  );
};

export default Thoughts;
