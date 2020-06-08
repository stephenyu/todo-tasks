import { Tasklist } from 'web/atoms/Tasklist.atom';

export interface Storage {
  store(tasklist: Tasklist): void;
  get(): Tasklist;
}
