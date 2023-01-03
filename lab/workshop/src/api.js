import * as request from './request.js'; 

const baseUrl = 'http://localhost:3030';
const recipesUrl = `${baseUrl}/data/recipes`
const registerUrl = `${baseUrl}/users/register`;
const loginUrl = `${baseUrl}/users/login`;
const logoutUrl = `${baseUrl}/users/logout`;

export const register = (email, password) => request.post(registerUrl, { email, password });

export const login = (email, password) => request.post(loginUrl, { email, password });

export const logout = () => request.get(logoutUrl);

export const createRecipe = (data) => request.post(recipesUrl, data);

export const getRecipe = (id) => request.get(`${recipesUrl}/${id}`);

export const getRecipes = () => request.get(recipesUrl);

export const deleteRecipe = (id) => request.del(`${recipesUrl}/${id}`);

export const editRecipe = (id, data) => request.put(`${recipesUrl}/${id}`, data);