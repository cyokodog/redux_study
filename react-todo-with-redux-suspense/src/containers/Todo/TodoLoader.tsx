import React from 'react';
import { useDispatch } from 'react-redux';

import { loadTasks } from './slice/loadTasks';

export const TodoLoader: React.FC = () => {
  const dispatch = useDispatch();
  const Todo = React.lazy(async () => {
    await dispatch(loadTasks());
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
