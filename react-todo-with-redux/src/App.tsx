import React from 'react';
import './App.css';
import { Todo } from './components/Todo/Index';

export const App: React.FC = () => {
  return <Todo />;
};

/*

import React, { Suspense } from 'react';
import './App.css';
import tasksModule, { fetchInitialTasks } from './modules/tasksModules';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';

const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

const dummyApi = () => {
  const initialTaskTitles = ['aaa', 'bbb'];
  return delay(5000).then(() => initialTaskTitles);
};

const fetchTasks = (dispatch: Dispatch) => {
  return dummyApi().then((titles) => {
    titles.forEach((title) => {
      dispatch(tasksModule.actions.addTask(title));
    });
  });
};

const App: React.FC = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchInitialTasks());
  // }, []);

  const Todo = React.lazy(() => {
    return new Promise<{ default: React.FC }>((resolve) => {
      fetchTasks(dispatch).then(() => {
        resolve(import('./Todo'));
      });
    });
  });

  return (
    <Suspense fallback={<div>now loading...</div>}>
      <Todo />
    </Suspense>
  );

  // return (
  //   <div>
  //     <TaskInput />
  //     <TaskList />
  //   </div>
  // );
};

export default App;

*/
