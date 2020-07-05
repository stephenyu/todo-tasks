import { Task } from 'web/types/task';
import { Tasklist } from 'web/atoms/Tasklist.atom';

export type RawTask = Pick<Task, 'description' | 'last_updated' | 'type' | 'done'>;

export interface TaskStorage {
  add(task: RawTask): Promise<number>;
  update(task: Task): Promise<void>;
  delete(id: number): Promise<void>;
  getAll(): Promise<Tasklist>;
}
