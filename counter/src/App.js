import React, { Component } from 'react'
import { connect } from 'react-redux';

import { actions } from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.onPlusClick = this.onPlusClick.bind(this);
    this.onMinusClick = this.onMinusClick.bind(this);
    this.onAsyncChange = this.onAsyncChange.bind(this);
  }

  onMinusClick() {
    const { actions, async } = this.props;
    actions.decrement(async);
  }

  onPlusClick() {
    const { actions, async } = this.props;
    actions.increment(async);
  }

  onAsyncChange(ev) {
    const { actions, async } = this.props;
    ev.target.checked ? actions.async() : actions.sync()
  }

  render() {
    const { count, async } = this.props;
    return (
      <div>
        <h1>Redux Demo :: react-redux</h1>
        <button onClick={this.onMinusClick}>-</button>
        <button onClick={this.onPlusClick}>+</button>
        <span className="bar" style={{width: count * 50 + 'px'}}>{count}</span>
        <p><label><input type="checkbox" checked={async} onChange={this.onAsyncChange}/>async</label></p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { count, async } = state;
  return { count, async };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: { ...actions, dispatch},
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
