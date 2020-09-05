import {
  POSTS_LOADING_REQUEST,
  POSTS_LOADING_SUCCESS,
  POSTS_LOADING_FAILURE,
  POSTS_WRITE_REQUEST,
  POSTS_WRITE_SUCCESS,
  POSTS_WRITE_FAILURE,
  POST_DETAIL_LOADING_REQUEST,
  POST_DETAIL_LOADING_SUCCESS,
  POST_DETAIL_LOADING_FAILURE,
  POST_UPLOADING_REQUEST,
  POST_UPLOADING_SUCCESS,
  POST_UPLOADING_FAILURE,
  POST_EDIT_LOADING_REQUEST,
  POST_EDIT_LOADING_SUCCESS,
  POST_EDIT_LOADING_FAILURE,
  POST_EDIT_UPLOADING_REQUEST,
  POST_EDIT_UPLOADING_SUCCESS,
  POST_EDIT_UPLOADING_FAILURE,
} from "../types";

const initialState = {
  isAuthenticated: null,
  posts: [],
  postDetail: "",
  postCount: "",
  loading: false,
  error: "",
  creatorId: "",
  categoryFindResult: "",
  title: "",
  searchBy: "",
  searchResult: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POSTS_LOADING_REQUEST:
      return {
        ...state,
        posts: [], // 새로고침할 때 posts 날려준다
        loading: true,
      };
    case POSTS_LOADING_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload], // 기존의 posts + 새로운 post
        loading: false,
      };
    case POSTS_LOADING_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case POSTS_WRITE_REQUEST:
      return {
        ...state,
        posts: [], // 새로고침할 때 posts 날려준다
        loading: true,
      };
    case POSTS_WRITE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case POSTS_WRITE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case POST_UPLOADING_REQUEST:
      console.log("POST_UPLOADING_REQUEST");
      return {
        ...state,
        loading: true,
      };
    case POST_UPLOADING_SUCCESS:
      console.log("POST_UPLOADING_SUCCESS");
      return {
        ...state,
        posts: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case POST_UPLOADING_FAILURE:
      console.log("POST_UPLOADING_FAILURE");
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case POST_DETAIL_LOADING_REQUEST:
      return {
        ...state,
        posts: [], // 새로고침할 때 posts 날려준다
        loading: true,
      };
    case POST_DETAIL_LOADING_SUCCESS:
      return {
        ...state,
        loading: false,
        postDetail: action.payload,
        creatorId: action.payload.creator._id,
        title: action.payload.title,
      };
    case POST_DETAIL_LOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case POST_EDIT_LOADING_REQUEST:
      return {
        ...state,
        posts: [], // 새로고침할 때 posts 날려준다
        loading: true,
      };
    case POST_EDIT_LOADING_SUCCESS:
      return {
        ...state,
        loading: false,
        postDetail: action.payload,
      };
    case POST_EDIT_LOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case POST_EDIT_UPLOADING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_EDIT_UPLOADING_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        posts: action.payload,
      };
    case POST_EDIT_UPLOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
