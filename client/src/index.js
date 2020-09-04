import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import loadUser from "./components/auth/loadUser";

// 리엑트 렌더링 전에 로그인 되어 있는지 확인
loadUser();

ReactDOM.render(<App />, document.getElementById("root"));
