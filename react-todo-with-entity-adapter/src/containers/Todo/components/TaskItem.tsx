import React from 'react';
import { Task } from '../../../shared/models/todo/task/task';
import { useDispatch } from 'react-redux';
import { todoSlice } from '../store/slice';

type Props = {
  task: Task;
};

export const TaskItem: React.FC<Props> = ({ task }) => {
  const dispatch = useDispatch();
  return (
    <li className={task.done ? 'done' : ''}>
      <label>
        <input
          type="checkbox"
          className="checkbox-input"
          onClick={() => dispatch(todoSlice.actions.doneTask(task))}
          defaultChecked={task.done}
        ></input>
        <span className="checkbox-label">{task.title}</span>
      </label>
      <button
        className="btn is-delete"
        onClick={() => dispatch(todoSlice.actions.deleteTask(task))}
      >
        削除
      </button>
    </li>
  );
};
// export default TaskItem;
