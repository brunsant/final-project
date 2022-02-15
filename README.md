# Team Retro

This fullstack project is a sprint retrospective tool where you can create a user and invite other users to do a interactive retro together. All participants can write reflective thoughts and categorise them by "add", "keep" "drop" "improve". Then the users are able to move to the next step and discuss everyone's (anonymous) thoughts, and create an action plan. Once the retrospective is over a summary is created and saved in the user's profile page.

## Features

- Backend with POST, PATCH, DELETE and GET endpoints using MongoDB
- Sign in / Sign up screens
- Authentication to access the main content
- User can create a retro and add multiple participants by username
- Post and delete thoughts and action items in specific screens.
- Summary with an overview of the retro
- Profile page with previous retros
- About us screen
- Log out function
- Styled components

## Production Process

- We started by creating a project plan, dividing the functions and components (backend and frontend) in a 4 weeks timeframe.
- The backend was the first step, where we created moongose models for the users and the retros and connect them. We also created endpoints for thoughts and action items and tested them in postman.
- We sketched the layout and divided the frontend into components, screens and reducers to handle user and retro ids.
- We set up the fetches to post and get information to connect the frontend to backend. Starting from signup/signin we went step by step to style and test each screen with its components. We used Chakra UI, sweetalert and react-tag-input libraries for popup alerts, tags and modals.

## View it live

Frontend: https://team-retro.netlify.app
Backend: https://retro-app-bruna-emelie.herokuapp.com/
