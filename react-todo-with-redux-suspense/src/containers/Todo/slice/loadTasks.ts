import { todoSlice } from '.';
import { todoRepo } from '../../../repositories/todo';
import { AppThunk } from '../../../store';

// export const loadTasks = () => {
//   return (dispatch: Dispatch) => {
//     dispatch(todoStore.actions.startFetching());
//     todoApi.getTasks().then((taskTitles) => {
//       taskTitles.forEach((title) => {
//         dispatch(todoStore.actions.addTask(title));
//       });
//       dispatch(todoStore.actions.endFetching());
//     });
//   };
// };

export const loadTasks = (): AppThunk => {
  return async (dispatch, _getState): Promise<void> => {
    // _getState() で stateが取得できる
    const tasks = await todoRepo.fetchTasks();
    dispatch(todoSlice.actions.setTasks(tasks));
  };
};
