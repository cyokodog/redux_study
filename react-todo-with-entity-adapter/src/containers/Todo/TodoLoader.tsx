import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { unwrapResult } from '@reduxjs/toolkit';
import { loadTasks } from './store/thunks';

export const TodoLoader: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const Todo = React.lazy(async () => {
    const resultAction = await dispatch(loadTasks());

    if (loadTasks.fulfilled.match(resultAction)) {
      // unwrapResult() で非同期処理で返却した payload が取得できる
      console.log('データ取得成功', unwrapResult(resultAction));
    }
    if (loadTasks.rejected.match(resultAction)) {
      console.log('データ取得失敗', unwrapResult(resultAction));
    }
    return import('./Todo');

    // named export の場合
    // return import('./Todo').then((module) => ({
    //   default: () => module.Todo(),
    // }));

    // Todo に Props がある場合
    // return import('./Todo').then((module) => ({
    //   default: () => module.Todo({ foo: 'hoge' }),
    // }));
  });
  return <Todo />;
};
