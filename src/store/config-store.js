import { applyMiddleware, createStore, compose } from "redux";
// redux
import { rootReducers } from "./reducers/root.reducer";
// thunk
import thunk from "redux-thunk";
// saga
import createMiddleWareSaga from 'redux-saga'
import { rootSaga } from './saga/rootSaga/rootSaga'
const middleWareSaga = createMiddleWareSaga()
// dev tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk, middleWareSaga))
);
// run saga
middleWareSaga.run(rootSaga)

