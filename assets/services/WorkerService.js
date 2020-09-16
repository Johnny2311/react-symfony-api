import http from "../http-common";
import axios from 'axios';

const CancelToken = axios.CancelToken;
let ajaxRequest = null;

const prepare = () => {
  if (ajaxRequest) {
    ajaxRequest.cancel();
  }
  ajaxRequest = CancelToken.source();
};

const getAll = () => {
  prepare();
  return http.get("/workers", {cancelToken: ajaxRequest.token});
};

const get = id => {
  prepare();
  return http.get(`/workers/${id}`, {cancelToken: ajaxRequest.token});
};

const create = (data) => {
  prepare();
  return http.post("/workers", data, {cancelToken: ajaxRequest.token});
};

const update = (id, data) => {
  prepare();
  return http.put(`/workers/${id}`, data, {cancelToken: ajaxRequest.token});
};

const remove = id => {
  prepare();
  return http.delete(`/workers/${id}`, {cancelToken: ajaxRequest.token});
};

const removeAll = () => {
  prepare();
  return http.delete(`/workers`, {cancelToken: ajaxRequest.token});
};

const findByName = name => {
  prepare();
  return http.get(`/workers?name=${name}`, {cancelToken: ajaxRequest.token});
};

const cancel = () => {
  if (ajaxRequest) {
    ajaxRequest.cancel();
  }
}


export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
  cancel
};
