import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import todoReducer from './todoReducer';
import { todoConfig } from '../../config/persist';

const appReducer = combineReducers({
    todo: persistReducer(todoConfig, todoReducer)
});

export default rootReducer = (state, action) => {
    return appReducer(state, action)
}