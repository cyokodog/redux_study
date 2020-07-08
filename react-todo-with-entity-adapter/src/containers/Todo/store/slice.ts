import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, makeTask } from '../../../shared/models/todo/task/task';
import { initialState } from './state';
import { tasksAdapter, barAdapter } from './entityAdapters';
import { loadTasks } from './thunks';
import { featureKey } from './featureKey';

export const todoSlice = createSlice({
  name: featureKey,
  initialState,

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
        tasksAdapter.setAll(state.taskEntityState, [newTask]);
      }
    });
  },
});
