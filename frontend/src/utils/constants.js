const BASE_URL = "http://localhost:8080"

export const API_URL = (slug) => `${BASE_URL}/${slug}`

export const RETRO_URL = (userId) => `${BASE_URL}/users/${userId}/retros`
