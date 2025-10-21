import axios from 'axios';
import AppConfig from '../config/AppConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const client = axios.create({
  baseURL: AppConfig.NODE_SERVER,
});

const request = options => {
  return client(options)
    .then(response => response.data)
    .catch(error => Promise.reject(error.response || error.message));
};

const createReqTypes = base => {
  const res = {};
  ['REQUEST', 'SUCCESS', 'FAILURE'].forEach(type => {
    res[type] = `${base}_${type}`;
  });
  return res;
};

const createPostReq = async (endpoint, data) => {
  const token = await getToken();
  return request({
    url: endpoint,
    method: 'post',
    data,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

const createPutReq = async (endpoint, data) => {
  const token = await getToken();
  return request({
    url: endpoint,
    method: 'put',
    data,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

const createPatchReq = async (endpoint, data) => {
  const token = await getToken();
  return request({
    url: endpoint,
    method: 'patch',
    data,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

const createGetReq = async (endpoint, data) => {
  const token = await getToken();

  return request({
    url: endpoint,
    method: 'get',
    params: data,
    headers: {Authorization: `Bearer ${token}`},
  });
};

const createDeleteReq = async (endpoint, data) => {
  const token = await getToken();
  return request({
    url: endpoint,
    method: 'delete',
    params: data,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return null;
  }
};

export {
  createPostReq,
  createGetReq,
  createReqTypes,
  createPutReq,
  createPatchReq,
  createDeleteReq,
};
