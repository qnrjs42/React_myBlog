import axios from "axios";
import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
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
function* watchlogout() {
  yield takeEvery(LOGOUT_REQUEST, logout);
}

export default function* authSaga() {
  yield all([fork(watchLoginUser), fork(watchlogout)]);
}
