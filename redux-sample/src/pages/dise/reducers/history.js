const history = (state = [], action) => {
  if (action.type === 'throwDise') {
    return [...state, action.value];
  }
  if (action.type === 'reset') {
    return [];
  }
  return state;
};

export default history;