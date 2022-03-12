import { REQUEST_AUTH, AUTH_SUCCESS, AUTH_ERROR, LOGOUT } from "./types";

let token = localStorage.getItem("token");
let isAuthenticated = localStorage.getItem("isAuthenticated") ? true : false;
let userType = localStorage.getItem("userType")
  ? localStorage.getItem("userType")
  : "";
let userID = localStorage.getItem("userID");
let userCoins = localStorage.getItem("userCoins");
export const initialState = {
  userType: userType,
  token: token,
  isAuthenticated: isAuthenticated,
  userID: userID,
  loading: false,
  userCoins:userCoins
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case REQUEST_AUTH:
      return {
        ...initialState,
        loading: true
      };
    case AUTH_SUCCESS:
      if (action.payload.rememberme) {
      
        console.log(action.payload.data);
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("userType", action.payload.userType);
        localStorage.setItem("userID", action.payload.data.userID);
        localStorage.setItem("userCoins", action.payload.data.userCoins);
      }
      return {
        ...initialState,
        token: action.payload.token,
        isAuthenticated: true,
        userID: action.payload.data.userID,
        loading: false,
        userType: action.payload.userType,
        userCoins: action.payload.data.userCoins
      };
    case LOGOUT:
      localStorage.clear();
      return {
        ...initialState,
        token: "",
        isAuthenticated: false,
        userID: "",
        loading: false,
        userType: "",
        userCoins:""
      };
    case AUTH_ERROR:
      return {
        ...initialState,
        loading: false,
        isAuthenticated: false,
        userID: "",
        userType: ""
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
