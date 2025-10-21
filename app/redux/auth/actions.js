import {REGISTER_USER, GET_USER, CLEAR_USER} from '../actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const register = data => {
  return {
    type: REGISTER_USER.REQUEST,
    payload: data,
  };
};

export const registerSuccess = data => ({
  type: REGISTER_USER.SUCCESS,
  payload: data,
});

export const registerFailure = data => ({
  type: REGISTER_USER.FAILURE,
  payload: data,
});

export const getUser = data => {
  return {
    type: GET_USER.REQUEST,
    payload: data,
  };
};

export const getUserSuccess = data => ({
  type: GET_USER.SUCCESS,
  payload: data,
});

export const getUserFailure = data => ({
  type: GET_USER.FAILURE,
  payload: data,
});

export const clearUser = () => {
  AsyncStorage.clear();
  return {
    type: CLEAR_USER,
    payload: {},
  };
};
