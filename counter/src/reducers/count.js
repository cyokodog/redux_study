export const count = (state, action) => {
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
