import React, { useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './App.css';
import { Task } from './Types';

const initialState: Task[] = [
  {
    id: 2,
    title: 'foo',
    done: false,
  },
  {
    id: 1,
    title: 'bar',
    done: true,
  },
];
const App: React.FC = () => {
  const [tasks, setTasks] = useState(initialState);

  return (
    <div>
      <TaskInput tasks={tasks} setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default App;
