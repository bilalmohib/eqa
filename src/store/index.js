import reducer from "./reducer";
import thunk from "redux-thunk";
import { configureStore, applyMiddleware } from "redux";

const store = configureStore(reducer, applyMiddleware(thunk));

export default store;
