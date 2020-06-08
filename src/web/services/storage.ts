import { Task } from 'web/types/task';
import { Tasklist } from 'web/atoms/Tasklist.atom';

export interface Storage {
  add(task: Task): Promise<number>;
  update(task: Task): void;
  delete(id: number): void;
  getAll(): Promise<Tasklist>;
}
