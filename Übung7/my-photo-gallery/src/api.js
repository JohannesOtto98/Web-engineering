// api.js
import axios from 'axios';

const baseURL = 'http://localhost:3002'; // Beispiel URL des JSON-Servers

export const getAllPhotos = () => {
  return axios.get(`${baseURL}/photos`);
};

export const addPhoto = (photo) => {
  return axios.post(`${baseURL}/photos`, photo);
};

export const deletePhoto = (id) => {
  return axios.delete(`${baseURL}/photos/${id}`);
};
