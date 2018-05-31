const delay = (dispatch, action) => setTimeout(() => {
  dispatch(action);
}, 300);

export const actions = {
  decrement(async) {
    const action = { type: 'DECREMENT' };
    async ? delay(this.dispatch, action) : this.dispatch(action)
  },
  increment(async) {
    const action = { type: 'INCREMENT' };
    async ? delay(this.dispatch, action) : this.dispatch(action)
  },
  async() {
    this.dispatch({ type: 'ASYNC' })
  },
  sync() {
    this.dispatch({ type: 'SYNC' })
  }
}
