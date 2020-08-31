import axios from "axios";
import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
  USER_LOADING_SUCCESS,
  USER_LOADING_FAILURE,
  USER_LOADING_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  CLEAR_ERROR_SUCCESS,
  CLEAR_ERROR_FAILURE,
  CLEAR_ERROR_REQUEST,
} from "../types";

// 로그인
const loginUserAPI = (loginData) => {
  console.log("loginData", loginData);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.post("api/auth", loginData, config);
};

function* loginUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);
    console.log("result", result);
    yield put({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: LOGIN_FAILURE,
      payload: err.response,
    });
  }
}
function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

// 로그아웃
function* logout(action) {
  try {
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOGOUT_FAILURE,
    });
    console.error(err);
  }
}
function* watchLogout() {
  yield takeEvery(LOGOUT_REQUEST, logout);
}

// 회원가입
const registerUserAPI = (req) => {
  console.log("req", req);

  return axios.post("api/user", req);
};

function* registerUser(action) {
  try {
    const result = yield call(registerUserAPI, action.payload);
    console.log("RegisterUser Data", result);
    yield put({
      type: REGISTER_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: REGISTER_FAILURE,
      payload: err.response,
    });
  }
}
function* watchRegisterUser() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
}

// 에러 클리어
function* clearError() {
  try {
    yield put({
      type: CLEAR_ERROR_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: CLEAR_ERROR_FAILURE,
    });
  }
}
function* watchClearError() {
  yield takeEvery(CLEAR_ERROR_REQUEST, clearError);
}

// 유저 로딩
const userLoadingAPI = (token) => {
  console.log(token);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return axios.get("api/auth/user", config);
};

function* userLoading(action) {
  try {
    console.log("action: ", action);
    const result = yield call(userLoadingAPI, action);
    yield put({
      type: USER_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: USER_LOADING_FAILURE,
      payload: err.response,
    });
  }
}
function* watchUserLoading() {
  yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

export default function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogout),
    fork(watchRegisterUser),
    fork(watchClearError),
    fork(watchUserLoading),
  ]);
}
