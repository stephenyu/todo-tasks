import * as React from 'react';
import * as Recoil from 'recoil';
import styled from 'styled-components';

import { currentTask } from 'web/atoms/current_task.atom';
import { TaskType } from 'web/types/task';
import { useTasklist } from 'web/hooks/useTasklist';

const StyledInput = styled.input`
border: 1px solid #E4E4E4;
-webkit-border-radius: 8px;
-moz-border-radius: 8px;
border-radius: 8px;
width: 500px;

padding: 4px 6px 3px;
`;

export const TaskInput = () => {
  const [task, setTask] = Recoil.useRecoilState(currentTask);
  const resetTask = Recoil.useResetRecoilState(currentTask);
  const { addTask } = useTasklist();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setTask({ ...task, description: event.target.value });

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      addTask();
      resetTask();
    }
  };

  return <div>
    <StyledInput type="text" value={task.description} onChange={onChange} onKeyDown={onKeyDown} />
  </div>;
};

