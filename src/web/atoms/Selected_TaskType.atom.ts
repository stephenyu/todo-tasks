import * as Recoil from 'recoil';

import { TaskType } from 'web/types/task';

export const SelectedTaskType = Recoil.atom({
  key: 'selected-task-type',
  default: TaskType.today
});
