const dummyTasks = [
  { title: 'aaa', done: false },
  { title: 'bbb', done: false },
];

const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

export const todoApi = {
  async get(): Promise<typeof dummyTasks> {
    await sleep(3000);
    return dummyTasks;
  },
};
