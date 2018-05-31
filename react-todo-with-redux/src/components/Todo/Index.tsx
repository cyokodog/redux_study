import React, { useEffect } from 'react';

import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { loadTasks } from './loadTasks';

export const Todo: React.FC = () => {
  const { fetching } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    const ret = dispatch(loadTasks());
    console.log('ret', ret);
  }, [dispatch]);

  return fetching ? (
    <div>初期化中...</div>
  ) : (
    <div>
      <TaskInput />
      <TaskList />
    </div>
  );
};
