import { combineReducers } from 'redux';
import userReducer from './userReducer';
import noteReducer from './noteReducer';

const reducer = combineReducers({
  user: userReducer,
  note: noteReducer
})

export default reducer;