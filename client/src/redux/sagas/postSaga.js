import {
  POSTS_LOADING_FAILURE,
  POSTS_LOADING_SUCCESS,
  POSTS_LOADING_REQUEST,
  POST_UPLOADING_SUCCESS,
  POST_UPLOADING_FAILURE,
  POST_UPLOADING_REQUEST,
  POST_DETAIL_LOADING_REQUEST,
  POST_DETAIL_LOADING_FAILURE,
  POST_DETAIL_LOADING_SUCCESS,
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
  console.log("uploadPostAPI");
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
      type: POST_UPLOADING_SUCCESS,
      payload: result.data,
    });

    yield put(push(`/post/${result.data._id}`));
  } catch (err) {
    yield put({
      type: POST_UPLOADING_FAILURE,
      payload: err,
    });
    yield put(push("/"));
  }
}

function* watchUploadPosts() {
  yield takeEvery(POST_UPLOADING_REQUEST, uploadPosts);
}

// 업로드
const loadPostDetailAPI = (payload) => {
  console.log("loadPostDetailAPI payload: ", payload);
  return axios.get(`/api/post/${payload}`);
};

function* loadPostDetail(action) {
  try {
    const result = yield call(loadPostDetailAPI, action.payload);
    console.log("post_detail_saga_data", result);

    yield put({
      type: POST_DETAIL_LOADING_SUCCESS,
      payload: result.data,
    });

    yield put(push(`/post/${result.data._id}`));
  } catch (err) {
    yield put({
      type: POST_DETAIL_LOADING_FAILURE,
      payload: err,
    });
    yield put(push("/"));
  }
}

function* watchLoadPostDetail() {
  yield takeEvery(POST_DETAIL_LOADING_REQUEST, loadPostDetail);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchUploadPosts),
    fork(watchLoadPostDetail),
  ]);
}
