import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Task, makeTask } from '../../../models/todo/task/task';

type State = {
  tasks: Task[];
};

const initialState: State = {
  tasks: [],
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
    deleteTask(state: State, action: PayloadAction<Task>) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
    },
    setTasks(state: State, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
  },
});
