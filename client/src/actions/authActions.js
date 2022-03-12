import axios from "axios";
import { AUTH_SUCCESS, AUTH_ERROR } from "../reducers/types";

const BASE_URL = process.env.REACT_APP_API_URL;

export const login = async ({
  dispatch,
  email,
  password,
  rememberme,
  userType
}) => {
  try {
    const res = await axios.post(BASE_URL + `/${userType}/login`, {
      email,
      password
    });
console.log(res);
   
    dispatch({
      type: AUTH_SUCCESS,
      payload: { ...res.data, rememberme, userType }
    });
    return {
      data: res.data,
      status: res.status
    };
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
    return {
      error: err.response.data.error,
      status: err.response.status
    };
  }
};

export const register = async ({ dispatch, user, userType }) => {
  try {
    console.log(user)
    console.log("=======");
    console.log(BASE_URL);
    const res = await axios.post(`http://localhost:8000/api/user/register`, {
      ...user
    });
    dispatch({
      type: AUTH_SUCCESS,
      payload: { ...res.data, rememberme: true, userType }
    });
    return {
      data: res.data,
      status: res.status
    };
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
    return {
      error: err.response.data.error,
      status: err.response.status
    };
  }
};

export const getUser = async ({ id, token, userType }) => {
  try {
    const res = await axios.get(`${BASE_URL}/${userType}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return {
      data: res.data,
      status: res.status
    };
  } catch (err) {
    return {
      error: err.response.data.error,
      status: err.response.status
    };
  }
};
