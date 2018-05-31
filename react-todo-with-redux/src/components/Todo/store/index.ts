import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../Types';

type State = {
  fetching: boolean;
  count: number;
  tasks: Task[];
};

const initialState: State = {
  fetching: false,
  count: 0,
  tasks: [],
};

export const todoStore = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    startFetching(state: State) {
      state.fetching = true;
    },
    endFetching(state: State) {
      state.fetching = false;
    },
    addTask(state: State, action: PayloadAction<string>) {
      const newTask: Task = {
        id: state.count + 1,
        title: action.payload,
        done: false,
      };
      state.tasks = [newTask, ...state.tasks];
      state.count = state.tasks.length;
    },
    doneTask(state: State, action: PayloadAction<Task>) {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.done = !task.done;
      }
    },
    deleteTask(state: State, action: PayloadAction<Task>) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
    },
  },
});

// export const { addTask, doneTask, deleteTask } = tasksModule.actions;

// export default tasksModule;
