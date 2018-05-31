import { Dispatch } from '@reduxjs/toolkit';
import { todoStore } from './store';
import { todoApi } from '../../apis/todo';

export const loadTasks = () => {
  return (dispatch: Dispatch, getState: any) => {
    console.log('foo', getState());
    dispatch(todoStore.actions.startFetching());
    return todoApi.getTasks().then((taskTitles) => {
      taskTitles.forEach((title) => {
        dispatch(todoStore.actions.addTask(title));
      });
      dispatch(todoStore.actions.endFetching());
    }) as Promise<any>;
  };
};
