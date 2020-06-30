// import { todoSlice } from '.';
// import { todoRepo } from '../../../repositories/todo';
// import { AppThunk } from '../../../store';
// import { createAsyncThunk } from '@reduxjs/toolkit';

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

// export const loadTasks = (): AppThunk => {
//   return async (dispatch, _getState): Promise<void> => {
//     // _getState() で stateが取得できる
//     const tasks = await todoRepo.fetchTasks();
//     dispatch(todoSlice.actions.setTasks(tasks));
//   };
// };

// export const loadTasks = createAsyncThunk<
//   // Return type of the payload creator
//   {
//     foo: number;
//   },
//   // First argument to the payload creator
//   number,
//   {
//     dispatch: AppDispatch;
//     state: State;
//     extra: {
//       jwt: string;
//     };
//   }
// >('todo/loadTasks', async () => {
//   const tasks = await todoRepo.fetchTasks();
//   return { tasks };
// });

// const fetchUserById = createAsyncThunk<
//   // Return type of the payload creator
//   MyData,
//   // First argument to the payload creator
//   number,
//   {
//     dispatch: AppDispatch
//     state: State
//     extra: {
//       jwt: string
//     }
//   }
// >('users/fetchById', async (userId, thunkApi) => {
//   const response = await fetch(`https://reqres.in/api/users/${userId}`, {
//     headers: {
//       Authorization: `Bearer ${thunkApi.extra.jwt}`
//     }
//   })
//   return (await response.json()) as MyData
// })
