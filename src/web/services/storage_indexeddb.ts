import Dexie from 'dexie';
import { Tasklist } from 'web/atoms/Tasklist.atom';
import { Task } from 'web/types/task';
import { Storage } from './storage';

class TaskDatabase extends Dexie {
  public tasks: Dexie.Table<Task, number>; // id is number in this case

  public constructor() {
    super("TaskDatabase");
    this.version(1).stores({
      tasks: "++id,description,last_updated,type,done"
    });
    this.tasks = this.table("tasks");
  }
}

class StorageIndexedDB implements Storage {
  private database = new TaskDatabase();

  public async add(task: Task) {
    return this.database.tasks.add(task);
  }

  public async update(task: Task) {
    return this.database.tasks.update(task, task);
  }

  public async delete(id: number) {
    return this.database.tasks.delete(id);
  }

  public async getAll() {
    const collection = this.database.tasks.where("id").above(0);
    const array = await collection.toArray();
    return array.reduce((list, task) => ({ ...list, [task.id]: task }), {});
  }
}

let localStorage: StorageIndexedDB;

function getIndexdDBStorage() {
  if (localStorage == undefined) {
    localStorage = new StorageIndexedDB();
  }

  return localStorage;
}

export const storage_indexeddb: Storage = {
  add: (task) => getIndexdDBStorage().add(task),
  update: (task) => getIndexdDBStorage().update(task),
  delete: (id) => getIndexdDBStorage().delete(id),
  getAll: async () => getIndexdDBStorage().getAll()
};
