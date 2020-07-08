import React from 'react';

import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';

//export const Todo: React.FC<{ foo: string }> = (props: { foo: string }) => {
export const Todo: React.FC = () => {
  return (
    <div>
      {/* <p>{props.foo}</p> */}
      <TaskInput />
      <TaskList />
    </div>
  );
};
export default Todo;
