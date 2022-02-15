import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { API_URL } from "../utils/constants";

import user from "../reducers/user";

import styled from "styled-components";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signin");
  const [error, setError] = useState("");
  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
          setError("Invalid username or password");
        }
      });
  };

  return (
    <>
      <HeaderContainer>
        <Image src="logo.svg" alt="logo" />
        <HeaderTitle>TEAM RETRO</HeaderTitle>
      </HeaderContainer>
      <Container>
        <Description>
          Engage your team and create an easy and efficient sprint
          retrospective.
        </Description>
        <Form onSubmit={onFormSubmit}>
          <Title>SIGN IN!</Title>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Error> {error}</Error>

          <Button type="submit" onClick={() => setMode("signin")}>
            Sign in
          </Button>
        </Form>
        <SecondContainer>
          <BottomDescription>
            Engage your team and create an easy and efficient sprint
            retrospective.
          </BottomDescription>
          <InfoSpan>Don't have an account?</InfoSpan>
          <InfoSpan>
            Sign up {""}
            <Link to="/signup">
              <LinkSpan>here</LinkSpan>!
            </Link>
          </InfoSpan>
        </SecondContainer>
      </Container>
    </>
  );
};

export default Signin;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 1025px) {
    width: 100%;
    flex-direction: row;
    margin: 50px 0 0;
    align-content: center;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  background-image: linear-gradient(
    to right,
    #16a795,
    #21aba6,
    #35aeb4,
    #4bb1c0,
    #61b4c9
  );
  min-height: 70px;
  padding-right: 20px;
`;

const HeaderTitle = styled.h1`
  font-size: 32px;
  padding: 0 20px;
  color: white;

  @media (min-width: 768px) {
    font-size: 42px;
    font-weight: 100;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  padding: 10px 10px;

  @media (min-width: 768px) {
    width: 70%;
    padding: 30px 40px 60px;
    border: 2px solid #66bfa6;
    border-radius: 10px;
    margin: 80px 0 0;
  }

  @media (min-width: 1025px) {
    width: 100%;
    max-width: 600px;
    height: 550px;
    margin: 0;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 10px;
    border-top-right-radius: 0;
  }
`;

const Description = styled.p`
  font-size: 20px;
  text-align: center;
  margin: 50px 20px 0;

  @media (min-width: 768px) {
    font-size: 30px;
    margin: 50px 100px 0;
  }

  @media (min-width: 1025px) {
    display: none;
  }
`;

const BottomDescription = styled.p`
  display: none;

  @media (min-width: 1025px) {
    display: block;
    font-size: 30px;
    text-align: center;
    margin-bottom: 50px;
  }
`;

const Title = styled.h1`
  font-size: 30px;
  margin: 0px;
  padding: 20px 0;

  @media (min-width: 768px) {
    font-size: 45px;
    padding: 30px 0;
  }

  @media (min-width: 1025px) {
    font-size: 30px;
  }
`;

const Label = styled.label`
  font-size: 18px;

  @media (min-width: 768px) {
    font-size: 25px;
    padding: 10px 0;
  }

  @media (min-width: 1025px) {
    font-size: 18px;
  }
`;
const Input = styled.input`
  padding: 2px 5px;
  border-radius: 5px;
  border: 1px solid #66bfa6;

  @media (min-width: 768px) {
    padding: 10px 10px;
  }

  @media (min-width: 1025px) {
    padding: 10px 10px;
  }
`;

const Button = styled.button`
  padding: 5px;
  margin: 20px;
  width: 130px;
  border-radius: 5px;
  border: none;
  background-color: #66bfa6;
  color: ;
  box-shadow: 0px 6px 10px #d3d3d3;
  cursor: pointer;
  align-self: center;

  @media (min-width: 768px) {
    padding: 10px;
    width: 160px;
    font-size: 18px;
  }

  @media (min-width: 1025px) {
  }
`;

const Error = styled.p`
  font-size: 16px;
  text-align: center;
  margin: 15px 0 5px 0;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const SecondContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media (min-width: 768px) {
    margin: 30px 0;
  }

  @media (min-width: 1025px) {
    width: 100%;
    max-width: 600px;
    height: 550px;
    border-radius: 10px;
    background-image: linear-gradient(
      to right,
      #66bfa6,
      #5cbdb1,
      #58bbbb,
      #5ab8c3,
      #61b4c9
    );
    border-top-left-radius: 0;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 0;
    border-top-right-radius: 10px;
  }
`;

const InfoSpan = styled.span`
  text-align: center;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const LinkSpan = styled.span`
  text-decoration: underline;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  margin: 10px 0 0 10px;

  @media (min-width: 768px) {
    width: 80px;
    height: 80px;
    margin: 10px 0 0 10px;
  }

  @media (min-width: 1025px) {
    width: 100px;
    height: 100px;
    margin: 10px 0 0 20px;
  }
`;
