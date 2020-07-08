import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

import { todoSlice } from '../containers/Todo/slice';
import { TypedUseSelectorHook, useSelector as rawUseSelector, useDispatch } from 'react-redux';

// const rootReducer = combineReducers({
//   todo: todoSlice.reducer,
// });
// export type RootState = ReturnType<typeof rootReducer>;
// export const store = configureStore({
//   reducer: rootReducer,
// });
export const store = configureStore({
  reducer: combineReducers({
    todo: todoSlice.reducer,
  }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

// const rootReducer = combineReducers({
//   todo: todoSlice.reducer,
// });

// export type RootState = ReturnType<typeof rootReducer>;

// export const store = configureStore({
//   reducer: rootReducer,
// });

// if (process.env.NODE_ENV === "development" && module.hot) {
//   module.hot.accept("./rootReducer", () => {
//     const newRootReducer = require("./rootReducer").default;
//     store.replaceReducer(newRootReducer);
//   });
//}

//export type AppDispatch = typeof store.dispatch;
