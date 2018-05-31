const history = (state = '', action) => {
  if (action.type === 'loading') {
    return 'loading...';
  }
  return '';
};

export default history;