import React from 'react';
import { TaskItem } from './TaskItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../../store';
import {
  _taskSelectors,
  lastTaskSelector,
  taskSelectors,
  tasksSearchSelectorByTitle,
  barSelectors,
} from '../store/selectors';

export const TaskList: React.FC = () => {
  // barAdapter.addOne(store.getState().todo.barEntityState, {
  //   id: 1,
  //   name: 'bar1',
  // });
  const bars = barSelectors.selectAll(store.getState());

  // tasksを得る、いくつかの方法
  //
  // 以下の書き方だとメモ化されない
  // const tasks = useSelector((state: RootState) => {
  //   const { taskEntityState } = state.todo;
  //   return taskEntityState.ids.map((id) => {
  //     return taskEntityState.entities[id];
  //   }) as Task[];
  // });
  // const { entities } = useSelector((state: RootState) => state.todo.taskEntityState);

  ///////
  // storeをimportしてstateをとるのもいいけど...
  // const tasks = useSelector(() => {
  //   return allTaskSelector(store.getState());
  // });
  //
  // useSelectorがstateを渡してくれるので以下でも...
  // const tasks = useSelector((state: RootState) => {
  //   return allTaskSelector(state);
  // });
  //
  // allTaskSelectorはstateのみを引数としてとるので、以下のように書ける
  // const tasks = useSelector(allTaskSelector);

  ///////
  // 上記と同じように以下パターンで書ける
  // const tasks = useSelector(() => taskSelectors.selectAll(store.getState()));
  // const tasks = useSelector((state: RootState) => taskSelectors.selectAll(state));
  // const tasks = useSelector(taskSelectors.selectAll);

  const tasks = useSelector((state: RootState) => {
    return _taskSelectors.selectAll(state.todo.taskEntityState);
  });

  const lastTask = useSelector(lastTaskSelector);

  const taskById1 = useSelector((state: RootState) => {
    return taskSelectors.selectById(state, 1);
  });

  const searchedTasks = useSelector((state: RootState) => {
    return tasksSearchSelectorByTitle({ state, title: 'b' });
  });

  return (
    <div className="inner">
      <p>bar:{bars.map((item) => item.name)}</p>
      <p>最後に追加したタスク：{lastTask?.title}</p>
      <p>id:1のタスク：{taskById1?.title}</p>
      <p>名前に「b」を含むタスク：{searchedTasks?.title}</p>
      {tasks.length <= 0 ? (
        <p>{'登録されたTODOはありません。'}</p>
      ) : (
        <TransitionGroup component="ul" className="task-list">
          {tasks.map((task) => (
            <CSSTransition key={task.id} timeout={{ enter: 300, exit: 700 }} classNames="fade">
              <TaskItem task={task} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
    </div>
  );
};

// export default TaskList;
