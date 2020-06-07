import * as Recoil from 'recoil';

import { TaskType, Task } from 'web/types/task';

export type TaskList = Record<number, Task>;

function createAtom(key: TaskType) {
  return Recoil.atom<TaskList>({
    key,
    default: {}
  });
}

export const TodayTaskList = createAtom(TaskType.today);
export const TomorrowTaskList = createAtom(TaskType.tomorrow);
export const SometimeTaskList = createAtom(TaskType.sometime);
