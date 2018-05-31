import { combineReducers } from 'redux';
import dise from './dise';
import history from './history';
import loading from './loading';

export default combineReducers({
  dise,
  history,
  loading
})