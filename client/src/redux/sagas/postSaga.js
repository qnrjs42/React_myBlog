import {
  POSTS_LOADING_FAILURE,
  POSTS_LOADING_SUCCESS,
  POSTS_LOADING_REQUEST,
  POSTS_UPLOADING_SUCCESS,
  POSTS_UPLOADING_FAILURE,
  POSTS_UPLOADING_REQUEST,
} from "../types";
import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { push } from "connected-react-router";
import axios from "axios";

// 모든 글 불러오기
const loadPostAPI = () => {
  return axios.get("/api/post");
};

function* loadPosts() {
  try {
    const result = yield call(loadPostAPI);

    console.log("loadPosts result: ", result);

    yield put({
      type: POSTS_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: POSTS_LOADING_FAILURE,
      payload: err,
    });
    yield push("/");
  }
}

function* watchLoadPosts() {
  yield takeEvery(POSTS_LOADING_REQUEST, loadPosts);
}

// 업로드
const uploadPostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.post("/api/post", payload, config);
};

function* uploadPosts(action) {
  try {
    console.log("uploadPost action", action);

    const result = yield call(uploadPostAPI, action.payload);
    console.log("uploadPostaAPI, action.payload", result);
    yield put({
      type: POSTS_UPLOADING_SUCCESS,
      payload: result.data,
    });

    yield put(push(`/post/${result.data._id}`));
  } catch (err) {
    yield put({
      type: POSTS_UPLOADING_FAILURE,
      payload: err,
    });
    yield push("/");
  }
}

function* watchUploadPosts() {
  yield takeEvery(POSTS_UPLOADING_REQUEST, uploadPosts);
}

export default function* postSaga() {
  yield all(fork(watchLoadPosts), [fork(watchUploadPosts)]);
}
