import { combineReducers } from 'redux'
import { count } from './count';
import { async } from './async';

export const reducers = combineReducers({
  count,
  async
})
