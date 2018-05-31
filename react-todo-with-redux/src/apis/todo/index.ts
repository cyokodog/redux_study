const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

const getTasks = () => {
  return delay(3000).then(() => {
    const initialTaskTitles = ['aaa', 'bbb'];
    return initialTaskTitles;
  });
};

export const todoApi = {
  getTasks,
};
