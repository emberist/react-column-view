import { reducer as column } from "react-column-view";
import { combineReducers, createStore } from "redux";

const reducers = {
    column
};

const rootReducer = combineReducers(reducers);

export default createStore(rootReducer);
