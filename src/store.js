import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from 'redux-thunk';
import { productReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";

const initialState = {};
const composeEnchanser = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducers({
    products: productReducer,
    carts: cartReducer
  }),
  initialState,
  composeEnchanser(applyMiddleware(thunk)),
)
export default store;