import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { POSTS_LOADING_REQUEST } from "../../redux/types";
import { Helmet } from "react-helmet";
import { Row } from "reactstrap";
import { GrowingSpinner } from "../../components/spinner/Spinner";
import PostCardOne from "../../components/post/PostCardOne";

const PostCardList = () => {
  // { posts } -> reducers/postReducer - initialState - posts: []
  // state.post -> reducers/index - post: postReducer
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: POSTS_LOADING_REQUEST,
    });
  }, [dispatch]);

  return (
    <>
      <Helmet title="Home" />
      <Row>{posts ? <PostCardOne posts={posts} /> : GrowingSpinner}</Row>
    </>
  );
};

export default PostCardList;
