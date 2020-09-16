import http from "../http-common";
import axios from 'axios';

const getAll = () => {
  return http.get("/workers");
};

const get = id => {
  return http.get(`/workers/${id}`);
};

const create = (data, file) => {
  return http.post("/workers", data);
};

const update = (id, data, file) => {
  return http.put(`/workers/${id}`, data);
};

const remove = id => {
  return http.delete(`/workers/${id}`);
};

const removeAll = () => {
  return http.delete(`/workers`);
};

const findByName = name => {
  return http.get(`/workers?name=${name}`);
};

const uploadFile = (id, file) => {
    return axios.create({
        baseURL: "https://127.0.0.1:8000/api",
        headers: {
          "Content-type": "multipart/form-data"
        }
    }).post(`/workers/photo/${id}`, file);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
  uploadFile
};
