import { Task, makeTask } from '../../models/todo/task/task';
import { todoApi } from '../../apis/todo';

export const todoRepo = {
  async fetchTasks(): Promise<Task[]> {
    const response = await todoApi.get();
    return response.map(({ title, done }) => {
      return makeTask(title, done);
    });
  },
};
