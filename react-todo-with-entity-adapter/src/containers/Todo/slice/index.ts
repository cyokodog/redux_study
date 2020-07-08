import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  CaseReducer,
  createEntityAdapter,
  EntityState,
} from '@reduxjs/toolkit';
import { Task, makeTask, Bar } from '../../../models/todo/task/task';
import { todoRepo } from '../../../repositories/todo';
import { AppDispatch } from '../../../store';
// import { loadTasks } from './loadTasks';

// type State = {
//   tasks: Task[];
// };

// const initialState: State = {
//   tasks: [],
// };

export interface TaskEntityState extends EntityState<Task> {
  lastId: number;
}

export const tasksAdapter = createEntityAdapter<Task>({
  // 今回のケースでは、idの識別が「id」という名前なので省略可能（taskIdみたいな名前のときは指定が必要）
  selectId: (task) => task.id,

  // タイトルでソートしたい場合は以下を指定（ソート不要なら省略する
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const taskInitialEntityState: TaskEntityState = tasksAdapter.getInitialState({
  lastId: 2,
});

// 複数Entityを扱う
export type BarEntityState = EntityState<Bar>;
export const barAdapter = createEntityAdapter<Bar>();

const barInitialEntityState: BarEntityState = barAdapter.getInitialState();
// const barInitialEntityState: BarEntityState = barAdapter.getInitialState({
//   ids: [1, 2],
//   entities: {
//     1: {
//       id: 1,
//       name: 'bar1',
//     },
//     2: {
//       id: 2,
//       name: 'bar2',
//     },
//   },
// });

console.log('chck', barInitialEntityState);

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

// const deleteTask: CaseReducer<State, PayloadAction<Task>> = (state, action) => {
//   state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
// };

export const todoSlice = createSlice({
  name: 'todo',

  // initialState: todoInitialState,
  // 複数 entity
  initialState: {
    taskEntityState: taskInitialEntityState,
    barEntityState: barInitialEntityState,
  },

  // initialState: tasksAdapter.getInitialState(),
  reducers: {
    // addTask(state: State, action: PayloadAction<string>) {
    //   const newTask = makeTask(action.payload);
    //   state.tasks.push(newTask);
    // },
    // addTask(state, action: PayloadAction<string>) {
    //   const newTask = makeTask(action.payload);
    //   console.log('addTask', newTask);
    //   tasksAdapter.addOne(state, newTask);
    //   state.lastId = newTask.id;
    // },
    // 複数 entity
    addTask(state, action: PayloadAction<string>) {
      const newTask = makeTask(action.payload);
      console.log('addTask', newTask);
      tasksAdapter.addOne(state.taskEntityState, newTask);
      state.taskEntityState.lastId = newTask.id;
    },

    // doneTask(state: State, action: PayloadAction<Task>) {
    //   const task = state.tasks.find((t) => t.id === action.payload.id);
    //   if (task) {
    //     task.done = !task.done;
    //   }
    // },
    // doneTask(state, action: PayloadAction<Task>) {
    //   const task = state.entities[action.payload.id];
    //   if (task) {
    //     task.done = !task.done;
    //   }
    // },
    // 複数 entity
    doneTask(state, action: PayloadAction<Task>) {
      const task = state.taskEntityState.entities[action.payload.id];
      if (task) {
        task.done = !task.done;
      }
    },

    // deleteTask(state: State, action: PayloadAction<Task>) {
    //   state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
    // },
    // deleteTask(state, action: PayloadAction<Task>) {
    //   tasksAdapter.removeOne(state, action.payload.id);
    // },
    // 複数 entity
    deleteTask(state, action: PayloadAction<Task>) {
      tasksAdapter.removeOne(state.taskEntityState, action.payload.id);
    },

    // setTasks(state: State, action: PayloadAction<{ tasks: Task[] }>) {
    //   state.tasks = action.payload.tasks;
    // },
    // setTasks(state, action: PayloadAction<{ tasks: Task[] }>) {
    //   tasksAdapter.setAll(state, action.payload.tasks);
    // },
    // 複数 entity
    setTasks(state, action: PayloadAction<{ tasks: Task[] }>) {
      tasksAdapter.setAll(state.taskEntityState, action.payload.tasks);
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(loadTasks.fulfilled, (state, action) => {
    //   // state.tasks = action.payload.tasks;
    //   tasksAdapter.setAll(state, action.payload.tasks);

    //   // 以下のように reducer を呼ぶこともできる
    //   // const _action = todoSlice.actions.setTasks(action.payload.tasks);
    //   // todoSlice.caseReducers.setTasks(state, _action);
    // });
    // 複数 entity
    builder.addCase(loadTasks.fulfilled, (state, action) => {
      tasksAdapter.setAll(state.taskEntityState, action.payload.tasks);

      barAdapter.setAll(state.barEntityState, [
        {
          id: 1,
          name: 'bar1',
        },
      ]);
    });

    builder.addCase(loadTasks.pending, (state, action) => {
      console.log('pending', action.meta.requestId);
    });

    // builder.addCase(loadTasks.rejected, (state, action) => {
    //   console.log('rejected');
    //   if (action.payload) {
    //     const title = `[${action.payload.message}] エラーの原因を調べる`;
    //     const newTask = makeTask(title);
    //     // state.tasks = [newTask];
    //     tasksAdapter.setAll(state, [newTask]);
    //   }
    // });
    builder.addCase(loadTasks.rejected, (state, action) => {
      console.log('rejected');
      if (action.payload) {
        const title = `[${action.payload.message}] エラーの原因を調べる`;
        const newTask = makeTask(title);
        // state.tasks = [newTask];
        tasksAdapter.setAll(state.taskEntityState, [newTask]);
      }
    });
  },
});
