import { RootState, store } from '../../../store';
import { tasksAdapter, TaskEntityState, barAdapter } from '../slice';
import { createSelector } from '@reduxjs/toolkit';
import { create } from 'domain';

const _taskStateSelector = (state: RootState) => state.todo.taskEntityState;
export const _taskSelectors = tasksAdapter.getSelectors();

// export const allTaskSelector = createSelector(_taskStateSelector, _taskSelectors.selectAll);

export const allTaskSelector = createSelector(
  (state: RootState) => state.todo.taskEntityState,
  _taskSelectors.selectAll,
);

const lastIdSelector = createSelector(
  _taskStateSelector,
  // 第一引数で指定した関数の戻り値を、引数に取る関数を指定する
  (state: TaskEntityState) => state.lastId,
);

const _entitiesTaskSelector = createSelector(_taskStateSelector, _taskSelectors.selectEntities);

// 指定IDのentityを取得
const _lastTaskSelector = createSelector(_entitiesTaskSelector, lastIdSelector, (entities, id) =>
  id ? entities[id] || null : null,
);
// selectByIdを使うと自前で書かなくて済む
// export const lastTaskSelector = createSelector(
//   _taskStateSelector,
//   lastIdSelector,
//   _taskSelectors.selectById,
// );

//////////

// stateを固定してselectorsをまとめて取得
export const taskSelectors = tasksAdapter.getSelectors(
  (state: RootState) => state.todo.taskEntityState,
);

export const lastTaskSelector = createSelector(
  (state: RootState) => state,
  (state: RootState) => state.todo.taskEntityState.lastId,
  taskSelectors.selectById,
);

// 引数ごとにselectorを指定してもいいけど...
// export const tasksSearchSelectorByTitle = createSelector(
//   (state: RootState) => state,
//   (state: RootState, title: string) => title,
//   (state, title: string) => {
//     return taskSelectors.selectAll(state).find((item) => {
//       return item.title.match(title);
//     });
//   },
// );
// payloadでまとめちゃったほうが楽かも...
export const tasksSearchSelectorByTitle = createSelector(
  (payload: { state: RootState; title: string }) => payload,
  (payload) => {
    return taskSelectors.selectAll(payload.state).find((item) => {
      return item.title.match(payload.title);
    });
  },
);

///////////////////////////////////

export const barSelectors = barAdapter.getSelectors(
  (state: RootState) => state.todo.barEntityState,
);

///////////////////////////////////

const fooSelector = createSelector(
  (_state: RootState) => 1,
  (_state: RootState) => 2,
  (_state: RootState) => 3,
  (a, b, c) => a + b + c,
);
const foo = fooSelector(store.getState());
console.log('foo', foo);

const barSelector = createSelector(
  (_state: RootState, bar: number) => bar,
  (_state: RootState) => 2,
  (_state: RootState) => 3,
  (a, b, c) => a + b + c,
);
const bar = barSelector(store.getState(), 10);
console.log('bar', bar);
