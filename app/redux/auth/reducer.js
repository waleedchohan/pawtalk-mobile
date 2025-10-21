import {REGISTER_USER, GET_USER, CLEAR_USER} from '../actions';

let initialState = {
  isLoading: false,
  token: null,
  user: {},
  errMsg: null,
  signupErrMsg: null,
};

export default (state = initialState, action) => {
  try {
    switch (action.type) {
      case REGISTER_USER.REQUEST:
        return {...state, isLoading: true, signupErrMsg: null};
      case REGISTER_USER.SUCCESS:
        return {
          ...state,
          isLoading: false,
          user: action.payload,
          signupErrMsg: null,
        };
      case REGISTER_USER.FAILURE:
        return {
          ...state,
          isLoading: false,
          user: {},
          signupErrMsg: action.payload.message,
        };
      case GET_USER.REQUEST:
        return {...state, isLoading: true};
      case GET_USER.SUCCESS:
        return {...state, isLoading: false, user: action.payload};
      case GET_USER.FAILURE:
        return {
          ...state,
          isLoading: false,
          user: {},
          errMsg: action.payload.message,
        };
      case CLEAR_USER:
        return initialState;
      default:
        return {...state};
    }
  } catch (err) {
    return state;
  }
};
