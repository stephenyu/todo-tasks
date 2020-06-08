import * as Recoil from 'recoil';

import { TaskType, Task } from 'web/types/task';

export type Tasklist = Record<number, Task>;

function filterTasklist(list: Tasklist, type: TaskType) {
  const temp = Object.values(list).filter(item => item.type === type)
    .reduce((list, task) => ({ ...list, [task.id]: task }), {});

  return temp;
}

function inverseFilterTasklist(list: Tasklist, type: TaskType) {
  return Object.values(list).filter(item => item.type !== type)
    .reduce((list, task) => ({ ...list, [task.id]: task }), {});
}

const TaskListAtom = Recoil.atom<Tasklist>({
  key: 'tasklist',
  default: {}
});

export const TodayTasklist = Recoil.selector<Tasklist>({
  key: 'today-tasklist',
  get: ({ get }) => filterTasklist(get(TaskListAtom), TaskType.today),
  set: ({ get, set }, newValue) => {
    const everythingBarType = inverseFilterTasklist(get(TaskListAtom), TaskType.today);
    set(TaskListAtom, { ...everythingBarType, ...newValue });
  }
});

export const TomorrowTasklist = Recoil.selector<Tasklist>({
  key: 'tomorrow-tasklist',
  get: ({ get }) => filterTasklist(get(TaskListAtom), TaskType.tomorrow),
  set: ({ get, set }, newValue) => {
    const everythingBarType = inverseFilterTasklist(get(TaskListAtom), TaskType.tomorrow);
    set(TaskListAtom, { ...everythingBarType, ...newValue });
  }
});

export const SometimeTasklist = Recoil.selector<Tasklist>({
  key: 'sometime-tasklist',
  get: ({ get }) => filterTasklist(get(TaskListAtom), TaskType.sometime),
  set: ({ get, set }, newValue) => {
    const everythingBarType = inverseFilterTasklist(get(TaskListAtom), TaskType.sometime);
    set(TaskListAtom, { ...everythingBarType, ...newValue });
  }
});
