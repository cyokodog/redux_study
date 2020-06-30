import { createSlice, PayloadAction, createAsyncThunk, CaseReducer } from '@reduxjs/toolkit';
import { Task, makeTask } from '../../../models/todo/task/task';
import { todoRepo } from '../../../repositories/todo';
import { AppDispatch } from '../../../store';
// import { loadTasks } from './loadTasks';

type State = {
  tasks: Task[];
};

const initialState: State = {
  tasks: [],
};

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
>('todo/loadTasks', async (_args, thunkApi) => {
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

// エラーを考慮しなければ、シンプルに以下のようにも書ける
// export const loadTasks = createAsyncThunk('todo/loadTasks', async (_args, _thunkApi) => {
//   // console.log('_args', args.dummy);
//   const tasks = await todoRepo.fetchTasks();
//   return { tasks };
// });

const deleteTask: CaseReducer<State, PayloadAction<Task>> = (state, action) => {
  state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTaskWithFoo: {
      reducer(state: State, action: PayloadAction<string>) {
        console.log(action.payload);
      },
      prepare(t: string) {
        return {
          payload: t + 'foo',
        };
      },
    },

    addTask(state: State, action: PayloadAction<string>) {
      // const newTask: Task = {
      //   id: state.tasks.length + 1,
      //   title: action.payload,
      //   done: false,
      // };
      // return {
      //   ...state,
      //   tasks: [newTask, ...state.tasks],
      // };
      const newTask = makeTask(action.payload);
      state.tasks.push(newTask);
    },
    doneTask(state: State, action: PayloadAction<Task>) {
      // const tasks = state.tasks.map((task) => {
      //   return task.id === action.payload.id ? { ...task, done: !task.done } : task;
      // });
      // return { ...state, tasks };
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.done = !task.done;
      }
    },
    // deleteTask(state: State, action: PayloadAction<Task>) {
    //   state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
    // },
    deleteTask, // 切り出してるパターン

    setTasks(state: State, action: PayloadAction<{ tasks: Task[] }>) {
      state.tasks = action.payload.tasks;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadTasks.fulfilled, (state, action) => {
      state.tasks = action.payload.tasks;
      // 以下のように reducer を呼ぶこともできる
      // const _action = todoSlice.actions.setTasks(action.payload.tasks);
      // todoSlice.caseReducers.setTasks(state, _action);
    });

    builder.addCase(loadTasks.pending, (state, action) => {
      console.log('pending', action.meta.requestId);
    });

    builder.addCase(loadTasks.rejected, (state, action) => {
      console.log('rejected');
      if (action.payload) {
        const title = `[${action.payload.message}] エラーの原因を調べる`;
        const newTask = makeTask(title);
        state.tasks = [newTask];
      }
    });
  },
});
