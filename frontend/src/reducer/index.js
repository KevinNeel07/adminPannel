import { combineReducers } from "redux";

import destinationAPI from './destination';
import user from './user'

export default combineReducers({
    destinationAPI,
    user
})