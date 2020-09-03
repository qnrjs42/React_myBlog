import {
  POSTS_LOADING_REQUEST,
  POSTS_LOADING_SUCCESS,
  POSTS_LOADING_FAILURE,
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

    default:
      return state;
  }
}
