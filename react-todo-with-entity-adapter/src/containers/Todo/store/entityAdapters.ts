import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { Task, Bar } from '../../../shared/models/todo/task/task';

export interface TaskEntityState extends EntityState<Task> {
  lastId: number;
}

export const tasksAdapter = createEntityAdapter<Task>({
  // 今回のケースでは、idの識別が「id」という名前なので省略可能（taskIdみたいな名前のときは指定が必要）
  selectId: (task) => task.id,

  // タイトルでソートしたい場合は以下を指定（ソート不要なら省略する
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const taskInitialEntityState: TaskEntityState = tasksAdapter.getInitialState({
  lastId: 2,
});

// 複数Entityを扱う
export type BarEntityState = EntityState<Bar>;
export const barAdapter = createEntityAdapter<Bar>();

export const barInitialEntityState: BarEntityState = barAdapter.getInitialState();
// const barInitialEntityState: BarEntityState = barAdapter.getInitialState({
//   ids: [1, 2],
//   entities: {
//     1: {
//       id: 1,
//       name: 'bar1',
//     },
//     2: {
//       id: 2,
//       name: 'bar2',
//     },
//   },
// });
