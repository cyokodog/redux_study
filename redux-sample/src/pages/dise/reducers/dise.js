import { combineReducers } from 'redux';

const dise = (state = '', action) => {
  if (action.type === 'throwDise') {
    return action.value;
  }
  return state;
};

export default dise;