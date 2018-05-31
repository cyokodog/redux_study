import React, { useState } from 'react';
import { Task } from '../Types';

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TaskList: React.FC<Props> = ({ tasks, setTasks }) => {
  const [inputTitle, setInputTitle] = useState('');
  const [count, setCount] = useState(tasks.length + 1);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
  };

  const handleSubmit = () => {
    if (!inputTitle) {
      return;
    }
    setCount(count + 1);
    const newTask: Task = {
      id: count,
      title: inputTitle,
      done: false,
    };
    setTasks([newTask, ...tasks]);
    setInputTitle('');
  };

  return (
    <div className="input-form">
      <div className="inner">
        <input
          type="text"
          className="input"
          value={inputTitle}
          onChange={handleInputChange}
        ></input>
        <button className="btn is-primary" onClick={handleSubmit}>
          追加
        </button>
      </div>
    </div>
  );
};
export default TaskList;
