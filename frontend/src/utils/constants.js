const BASE_URL = "http://localhost:8080"

// to post/create a new retro to the api backend
export const API_URL = (slug) => `${BASE_URL}/${slug}`

// GET request to get retros by user
export const RETRO_URL = (userId) => `${BASE_URL}/users/${userId}/retros`

// POST request to post thoughts by retro
export const THOUGHT_URL = (id) => `${BASE_URL}/retros/${id}/thoughts`

//GET request to get thoughts by retro
export const THOUGHT_RETRO_URL = (id) => `${BASE_URL}/retros/${id}/thoughts`
