import { createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from '../../../shared/models/todo/task/task';
import { todoRepo } from '../../../shared/repositories/todo';
import { featureKey } from './featureKey';

export const loadTasks = createAsyncThunk<
  // Return type of the payload creator
  { tasks: Task[] },
  // First argument to the payload creator
  // { dummy: number },
  void,
  // Types for ThunkAPI
  {
    // extra: {
    //   jwt: string;
    // };
    rejectValue: {
      status: number;
      message: string;
    };
  }
>(`${featureKey}/loadTasks`, async (_args, thunkApi) => {
  try {
    // throw new Error('err');
    const tasks = await todoRepo.fetchTasks();
    return { tasks };
  } catch (e) {
    return thunkApi.rejectWithValue({
      status: -1,
      message: 'タスクデータの取得に失敗しました',
    });
  }
});
