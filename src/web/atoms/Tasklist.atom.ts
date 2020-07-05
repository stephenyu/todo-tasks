import * as Recoil from 'recoil';

import { task_storage_indexeddb } from 'web/services/task_storage/task_storage_indexeddb';
import { TaskType, Task } from 'web/types/task';

export type Tasklist = Record<number, Task>;

function filterTasklist(list: Tasklist, type: TaskType) {
  return Object.values(list).filter(item => item.type === type)
    .reduce((list, task) => ({ ...list, [task.id]: task }), {});
}

export const TasklistAtom = Recoil.atom<Tasklist>({
  key: 'tasklistatom',
  default: task_storage_indexeddb.getAll()
});

export const TodayTasklist = Recoil.selector<Tasklist>({
  key: 'today-tasklist',
  get: ({ get }) => filterTasklist(get(TasklistAtom), TaskType.today)
});

export const TomorrowTasklist = Recoil.selector<Tasklist>({
  key: 'tomorrow-tasklist',
  get: ({ get }) => filterTasklist(get(TasklistAtom), TaskType.tomorrow),
});

export const SometimeTasklist = Recoil.selector<Tasklist>({
  key: 'sometime-tasklist',
  get: ({ get }) => filterTasklist(get(TasklistAtom), TaskType.sometime),
});
