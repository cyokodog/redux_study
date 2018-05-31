import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './actions/';

class DiseContainer extends Component {

  // constructor(props) { 
  //   super(props);
  //   const { dispatch } = props;
  // }

  render() {
    const { dise, history, loading, actions, pureActions, dispatch, store } = this.props;
    console.log('store', store); // undefined
    return (
      <div>
        <div>
        <button onClick={ () => {dispatch(  (dispatch) => { dispatch({type: 'reset'}) }          )} }>noDispatchClear</button>
        </div>

        <div>
          <button onClick={ actions.throwDiseByThunk}>throwDiseByThunk(3s)</button>
        </div>

        <div>
          <button onClick={ () => {pureActions.throwDiseWithDispatch(dispatch)} }>Throw Dise With Dispatch(3s)</button>
        </div>
        <div>
          <button onClick={
            () => {
              setTimeout(() => {
                dispatch(pureActions.throwDise())
              }, 1000)
            }
          }>Dispatch to Throw Dise (1s)</button>
        </div>
        <div>
          <button onClick={ actions.throwDise }>Bind dispatch to throw dise</button>
          <span>{ loading || dise }</span>
        </div>
        <div>
          <button onClick={ actions.reset2 }>reset2</button>
        </div>
        <div>
          <button onClick={ actions.reset }>reset</button>
          <span>{ history.join() }</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return state;
};
 
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    pureActions: actions,
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DiseContainer);