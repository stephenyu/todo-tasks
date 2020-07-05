import * as Recoil from 'recoil';

import { task_storage_indexeddb } from 'web/services/task_storage/task_storage_indexeddb';
import { Tasklist, TasklistAtom } from 'web/atoms/Tasklist.atom';
import { currentTask } from 'web/atoms/current_task.atom';
import { Task } from 'web/types/task';

type AddTask = () => void;
type UpdateTask = (task: Task) => void;

export const useTasklist = () => {
  const [tasklist, setTasklist] = Recoil.useRecoilState<Tasklist>(TasklistAtom);
  const task = Recoil.useRecoilValue(currentTask);

  const addTask: AddTask = async () => {
    const constructedTask = { ...task,
      done: false,
      last_updated: new Date().getTime()
    };

    const id = await task_storage_indexeddb.add(constructedTask);
    setTasklist(prevTasklist => ({ ...prevTasklist, [id]: { ...constructedTask, id } }));
  };

  const updateTask: UpdateTask = async (task) => {
    await task_storage_indexeddb.update(task);
    setTasklist(prevTasklist => ({ ...prevTasklist, [task.id]: task }));
  };

  return {
    tasklist,
    addTask,
    updateTask
  };
};
