import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

import createRootReducer from "./redux/reducers/index";
import rootSaga from "./redux/sagas/index";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

// 초기상태 초기화
const initialState = {};

// 나중에 미들웨어 추가 시, 배열 안에 하나씩 추가하면 된다.
const middlewares = [sagaMiddleware, routerMiddleware(history)];
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPSE__;

// 배포환경에서 redux_devtools가 안 보이게 설정
const composeEnhancer =
  process.env.NODE_ENV === "production" ? compose : devtools || compose;

// store 생성
const store = createStore(
  createRootReducer(history),
  initialState,
  composeEnhancer(applyMiddleware(...middlewares))
);

// sagaMiddleware로 작동
sagaMiddleware.run(rootSaga);

export default store;
