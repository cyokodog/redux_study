export const async = (state, action) => {
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
