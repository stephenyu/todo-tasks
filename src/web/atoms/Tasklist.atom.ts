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

const TasklistAtom = Recoil.atom<Tasklist>({
  key: 'tasklistatom',
  default: {}
});

const Tasklist = Recoil.selector<Tasklist>({
  key: 'tasklist',
  get: ({ get }) => get(TasklistAtom),
  set: ({ set }, newValue) => set(TasklistAtom, newValue)
});

export const TodayTasklist = Recoil.selector<Tasklist>({
  key: 'today-tasklist',
  get: ({ get }) => filterTasklist(get(Tasklist), TaskType.today),
  set: ({ get, set }, newValue) => {
    const everythingBarType = inverseFilterTasklist(get(Tasklist), TaskType.today);
    set(Tasklist, { ...everythingBarType, ...newValue });
  }
});

export const TomorrowTasklist = Recoil.selector<Tasklist>({
  key: 'tomorrow-tasklist',
  get: ({ get }) => filterTasklist(get(Tasklist), TaskType.tomorrow),
  set: ({ get, set }, newValue) => {
    const everythingBarType = inverseFilterTasklist(get(Tasklist), TaskType.tomorrow);
    set(Tasklist, { ...everythingBarType, ...newValue });
  }
});

export const SometimeTasklist = Recoil.selector<Tasklist>({
  key: 'sometime-tasklist',
  get: ({ get }) => filterTasklist(get(Tasklist), TaskType.sometime),
  set: ({ get, set }, newValue) => {
    const everythingBarType = inverseFilterTasklist(get(Tasklist), TaskType.sometime);
    set(Tasklist, { ...everythingBarType, ...newValue });
  }
});
