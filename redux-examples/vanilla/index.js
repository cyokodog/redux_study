// action creator
const delay = (dispatch, action) => setTimeout(() => {
  dispatch(action);
}, 300);

const actions = {
  async() {
    this.dispatch({ type: 'ASYNC' })
  },
  sync() {
    this.dispatch({ type: 'SYNC' })
  },
  decrement(async) {
    const action = { type: 'DECREMENT' };
    async ? delay(this.dispatch, action) : this.dispatch(action)
  },
  increment(async) {
    const action = { type: 'INCREMENT' };
    async ? delay(this.dispatch, action) : this.dispatch(action)
  },
}

// reducer
const count = (state, action) => {
  if (typeof state === 'undefined') {
    return 1
  }
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}
const async = (state, action) => {
  if (typeof state === 'undefined') {
    return false
  }
  switch (action.type) {
    case 'ASYNC':
      return true
    case 'SYNC':
      return false
    default:
      return state
  }
}

const reducers = Redux.combineReducers({
  count,
  async
})

// view
const view = {
  render() {
    const { count, async } = this.props; 
    const checked = async ? 'checked' : '';
    document.querySelector('.view').innerHTML = `
      <button onclick="view.onMinusClick()">-</button>
      <button onclick="view.onPlusClick()">+</button>
      <span class="bar" style="width:${count * 50}px">${count}</span>
      <p>
        <label><input type="checkbox" ${checked} onchange="view.onAsyncChange(this.checked)">async</label>
      </p>
    `
  },
  onMinusClick() {
    const { actions, async } = this.props;
    actions.decrement(async);
  },
  onPlusClick() {
    const { actions, async } = this.props;
    actions.increment(async);
  },
  onAsyncChange(checked) {
    const { actions } = this.props;
    checked ? actions.async() : actions.sync()
  }
}

// store
const store = Redux.createStore(reducers)

const render = () => {
  const { count, async } = store.getState(); 
  const { dispatch } = store;

  view.props = {
    count,
    async,
    actions: {...actions, dispatch}
  }
  view.render()
}

store.subscribe(render);
render();