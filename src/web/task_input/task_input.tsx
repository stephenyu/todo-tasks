import * as React from 'react';
import * as Recoil from 'recoil';

import { TaskType, Task } from 'web/types/task';
import { TodayTaskList, TomorrowTaskList, SometimeTaskList } from 'web/atoms/TaskList.atom';

const initialisedTask = { description: '', type: TaskType.today };

function createTask(task: Partial<Task>): Task {
  return {
    ...initialisedTask,
    done: false,
    date: new Date().getTime(),
    ...task,
  };
}

export const SelectTaskType = ({ onSelected, selected }: {onSelected: (type: TaskType) => void, selected: TaskType}) => {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => onSelected(event.target.value as TaskType);

  const options = [TaskType.today, TaskType.tomorrow, TaskType.sometime]
    .map((taskType, index) => <option key={index} value={taskType}>{taskType}</option>);

  return <select onChange={onChange} value={selected}>{options}</select>;
};

export const TaskInput = () => {
  const [task, setTask] = React.useState<Partial<Task>>(initialisedTask);

  const taskLists = {
    [TaskType.today]: Recoil.useSetRecoilState(TodayTaskList),
    [TaskType.tomorrow]: Recoil.useSetRecoilState(TomorrowTaskList),
    [TaskType.sometime]: Recoil.useSetRecoilState(SometimeTaskList),
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setTask({ ...task, description: event.target.value });

  const onTaskTypeSelected = (type: TaskType) => setTask({ ...task, type });

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      const constructedTask = createTask(task);
      taskLists[constructedTask.type](prevTasks => ({ ...prevTasks, [constructedTask.date] : constructedTask }));
      setTask(initialisedTask);
    }
  };

  return <div>
    <input type="text" value={task.description} onChange={onChange} onKeyDown={onKeyDown}/>
    <SelectTaskType selected={task.type} onSelected={onTaskTypeSelected}/>
  </div>;
};

