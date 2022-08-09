import { combineReducers } from "redux";
import reducerProduct from "./product";
import reducerHome from "./userHome";
import userReducer from "./userReducer";

const reducers = combineReducers({
    user:userReducer,
    home:reducerHome,
    product:reducerProduct
})

export default reducers