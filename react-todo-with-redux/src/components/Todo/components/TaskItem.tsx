import React from 'react';
import { Task } from '../Types';
import { useDispatch } from 'react-redux';
import { todoStore } from '../store';

type Props = {
  task: Task;
};

const TaskItem: React.FC<Props> = ({ task }) => {
  const dispatch = useDispatch();
  return (
    <li className={task.done ? 'done' : ''}>
      <label>
        <input
          type="checkbox"
          className="checkbox-input"
          onClick={() => dispatch(todoStore.actions.doneTask(task))}
          defaultChecked={task.done}
        ></input>
        <span className="checkbox-label">{task.title}</span>
      </label>
      <button
        className="btn is-delete"
        onClick={() => dispatch(todoStore.actions.deleteTask(task))}
      >
        削除
      </button>
    </li>
  );
};
export default TaskItem;
