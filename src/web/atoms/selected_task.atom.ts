import { atom } from 'recoil';
import { Task } from 'web/types/task';

export const SelectedTask = atom<Task | undefined>({
  key: 'selected-task',
  default: undefined
});
