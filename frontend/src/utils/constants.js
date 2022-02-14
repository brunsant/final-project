const BASE_URL = "https://retro-app-bruna-emelie.herokuapp.com";

// to post/create a new retro to the api backend
export const API_URL = (id) => `${BASE_URL}/${id}`;

// GET request to get retros by user
export const RETRO_URL = (id) => `${BASE_URL}/users/${id}/retros`;

// POST/GET request to post thoughts by retro
export const THOUGHT_URL = (id) => `${BASE_URL}/retros/${id}/thoughts`;

// POST request to post action plan tasks
export const ACTION_PLAN_URL = (id) => `${BASE_URL}/retros/${id}/actionitems`;

// PATCH request to set retro to inactive
export const ACTIVE_URL = (id) => `${BASE_URL}/retros/${id}`;

//DELETE request for the retros
export const DELETE_RETRO = (id) => `${BASE_URL}/retros/${id}`;

//DELETE request for the thoughts
export const DELETE_THOUGHTS = (id) => `${BASE_URL}/thoughts/${id}`;

//DELETE request for the action plan
export const DELETE_ACTION = (id) => `${BASE_URL}/actionitems/${id}`;
