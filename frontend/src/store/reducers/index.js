import { combineReducers } from 'redux';
import taskReducer from './taskReducer';

const rootReducer = combineReducers({
  taskStore: taskReducer
})

export default rootReducer;