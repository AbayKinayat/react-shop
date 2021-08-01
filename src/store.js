import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from 'redux-thunk';
import { productReducer } from "./reducers/productReducer";

const initialState = {};
const composeEnchanser = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducers({
    products: productReducer,
  }),
  initialState,
  composeEnchanser(applyMiddleware(thunk)),
)
export default store;