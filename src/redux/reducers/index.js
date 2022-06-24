import { combineReducers } from "redux";
import { homepagedata   }  from "./productReducer";
const reducers = combineReducers({
    Homepage : homepagedata,
});


export default reducers;