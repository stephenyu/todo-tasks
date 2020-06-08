import * as React from 'react';
import * as Recoil from 'recoil';
import styled from 'styled-components';

import { TaskType, Task } from 'web/types/task';
import { TodayTasklist, TomorrowTasklist, SometimeTasklist } from 'web/atoms/Tasklist.atom';
import { SelectedTaskType } from 'web/atoms/Selected_TaskType.atom';

const StyledInput = styled.input`
border: 1px solid #E4E4E4;
-webkit-border-radius: 8px;
-moz-border-radius: 8px;
border-radius: 8px;
width: 500px;

padding: 4px 6px 3px;
`;

const initialisedTask = { description: '', type: TaskType.today };

function createTask(task: Partial<Task>): Task {
  return {
    ...initialisedTask,
    done: false,
    id: new Date().getTime(),
    last_updated: new Date().getTime(),
    ...task,
  };
}

export const TaskInput = () => {
  const [task, setTask] = React.useState<Partial<Task>>(initialisedTask);
  const selectedTaskType = Recoil.useRecoilValue(SelectedTaskType);

  const taskLists = {
    [TaskType.today]: Recoil.useSetRecoilState(TodayTasklist),
    [TaskType.tomorrow]: Recoil.useSetRecoilState(TomorrowTasklist),
    [TaskType.sometime]: Recoil.useSetRecoilState(SometimeTasklist),
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setTask({ ...task, description: event.target.value });

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      const constructedTask = createTask({ ...task, type: selectedTaskType });
      taskLists[constructedTask.type](prevTasks => ({ ...prevTasks, [constructedTask.id] : constructedTask }));
      setTask(initialisedTask);
    }
  };

  return <div>
    <StyledInput type="text" value={task.description} onChange={onChange} onKeyDown={onKeyDown} />
  </div>;
};

