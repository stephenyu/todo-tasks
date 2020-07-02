import { Task } from 'web/types/task';
import { Tasklist } from 'web/atoms/Tasklist.atom';

export type RawTask = Pick<Task, 'description' | 'last_updated' | 'type' | 'done'>;

export interface Storage {
  add(task: RawTask): Promise<number>;
  update(task: Task): Promise<void>;
  delete(id: number): Promise<void>;
  getAll(): Promise<Tasklist>;
}

export interface StorageDocument {
  save(document: string): Promise<void>;
  retrieve(): Promise<string>;
}
