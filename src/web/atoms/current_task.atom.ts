import { selector, atom } from 'recoil';

import { TaskType, Task } from 'web/types/task';

type InfluxTask = Pick<Task, 'description' | 'type'>;

export const currentTask = atom<InfluxTask>({
  key: 'currentTask',
  default: { description: '', type: TaskType.today }
});

export const currentType = selector<TaskType>({
  key: 'currentTasktype',
  get: ({ get }) => get(currentTask).type,
  set: ({ get, set }, type) => set(currentTask, { ...get(currentTask), type })
});

