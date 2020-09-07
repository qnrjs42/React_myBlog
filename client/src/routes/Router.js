import React, { Fragment } from "react";
import { Container } from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import AppNavbar from "../components/AppNavbar";

import CategoryResult from "./normalRoute/CategoryResult";
import PostCardList from "./normalRoute/PostCardList";
import PostWrite from "./normalRoute/PostWrite";
import PostDetail from "./normalRoute/PostDetail";
import Search from "./normalRoute/Search";
import PostEdit from "./normalRoute/PostEdit";
import { EditProtectedRoute } from "./protectedRoute/ProtectedRoute";

const MyRouter = () => {
  return (
    <Fragment>
      <AppNavbar />
      <Header />
      <Container id="main-body">
        <Switch>
          <Route path="/" exact component={PostCardList} />
          <Route path="/post" exact component={PostWrite} />
          <Route path="/post/:id" exact component={PostDetail} />
          <EditProtectedRoute
            path="/post/:id/edit"
            exact
            component={PostEdit}
          />
          <Route
            path="/post/category/:categoryName"
            exact
            component={CategoryResult}
          />
          <Route path="/search/:searchTerm" exact component={Search} />
          <Redirect from="*" to="/" />{" "}
          {/* 위의 주소 외에 다른 주소가 들어오면 해당 주소로 리다이렉션 */}
        </Switch>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default MyRouter;
