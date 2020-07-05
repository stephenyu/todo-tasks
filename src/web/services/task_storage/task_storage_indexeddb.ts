import Dexie from 'dexie';
import { Tasklist } from 'web/atoms/Tasklist.atom';
import { Task } from 'web/types/task';
import { TaskStorage, RawTask } from './task_storage';

class TaskDatabase extends Dexie {
  public tasks: Dexie.Table<RawTask, number>; // id is number in this case

  public constructor() {
    super("TaskDatabase");
    this.version(1).stores({
      tasks: "++id,description,last_updated,type,done"
    });
    this.tasks = this.table("tasks");
  }
}

class TaskStorageIndexedDB implements TaskStorage {
  private database = new TaskDatabase();

  public async add(task: RawTask) {
    return this.database.tasks.put(task);
  }

  public async update(task: Task) {
    this.database.tasks.update(task.id, (({ description, type, done }: RawTask) => ({ description, type, done, last_updated: new Date().getTime() }))(task));
  }

  public async delete(id: number) {
    return this.database.tasks.delete(id);
  }

  public async getAll() {
    const collection = this.database.tasks.where("id").above(0);
    const list: Tasklist = {};
    await collection.each((task, { primaryKey }) => {
      if (task.done) {
        const result = new Date(task.last_updated);
        result.setDate(result.getDate() + 5);

        if (result.getTime() >= new Date().getTime()) {
          list[primaryKey] = { ...task, id: primaryKey };
        }
      } else {
        list[primaryKey] = { ...task, id: primaryKey };
      }
    });
    return list;
  }
}

let localStorage: TaskStorageIndexedDB;

function getIndexdDBStorage() {
  if (localStorage == undefined) {
    localStorage = new TaskStorageIndexedDB();
  }

  return localStorage;
}

export const task_storage_indexeddb: TaskStorage = {
  add: (task) => getIndexdDBStorage().add(task),
  update: (task) => getIndexdDBStorage().update(task),
  delete: (id) => getIndexdDBStorage().delete(id),
  getAll: async () => getIndexdDBStorage().getAll()
};
