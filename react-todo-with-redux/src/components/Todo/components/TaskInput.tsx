import React, { useState } from 'react';
import { todoStore } from '../store';
import { useDispatch } from 'react-redux';

const TaskList: React.FC = () => {
  const dispatch = useDispatch();

  const [inputTitle, setInputTitle] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputTitle) {
      return;
    }
    dispatch(todoStore.actions.addTask(inputTitle));
    setInputTitle('');
  };

  return (
    <div className="input-form">
      <form className="inner" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          value={inputTitle}
          onChange={handleInputChange}
        ></input>
        <button className="btn is-primary">追加</button>
      </form>
    </div>
  );
};
export default TaskList;
