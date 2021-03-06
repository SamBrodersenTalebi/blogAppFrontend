import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log(token);
  console.log(newObject);
  const response = await axios.post(baseUrl, newObject, config);
  console.log(response.data);
  return response.data;
};

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const update = async (newObject, id) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject);
  return request.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  if (window.confirm('Are you sure you want to delete the blog?')) {
    await axios.delete(`${baseUrl}/${id}`, config);
  }
};

const addComment = async (content, id) => {
  let response = await axios.post(`${baseUrl}/${id}/comments`, content);
  console.log(response.data);
  return response.data;
};

export default {
  getAll,
  create,
  getById,
  setToken,
  update,
  remove,
  addComment,
};
