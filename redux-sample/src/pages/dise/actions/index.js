const getNumber = () => {
  const min = 1 ;
  const max = 6 ;
  return Math.floor( Math.random() * (max + 1 - min) ) + min ;
}

export const throwDise = () => {
  return {type: 'throwDise',value: getNumber()}
};

export const throwDiseWithDispatch = (dispatch) => {
  dispatch({type: 'loading'});
  setTimeout(() => {
    dispatch({type: 'throwDise',value: getNumber()});
  }, 3000);
};

export const throwDiseByThunk = () => {
  return dispatch => {
    dispatch({type: 'loading'});
    setTimeout(() => {
      dispatch({type: 'throwDise',value: getNumber()});
    }, 3000);
  }
}



export const reset = () => {
  return {
    type: 'reset'
  }
};

export const reset2 = () => {
  return dispatch => {
    return dispatch({
      type: 'reset'
    });
  }

};
