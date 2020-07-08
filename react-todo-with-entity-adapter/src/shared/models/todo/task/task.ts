let currentId = 0;

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export const makeTask = (title: string, done = false): Task => {
  currentId++;
  return {
    id: currentId,
    title,
    done,
  };
};

export interface Bar {
  id: number;
  name: string;
}
