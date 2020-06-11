import * as React from 'react';
import * as Recoil from 'recoil';
import styled from 'styled-components';

import { currentType } from 'web/atoms/current_task.atom';
import { SelectedTask } from 'web/atoms/selected_task.atom';

import { useTasklist } from 'web/hooks/useTasklist';
import { Tasklist as TasklistType } from 'web/atoms/Tasklist.atom';
import { TaskType, Task } from 'web/types/task';

interface TasklistProps {
  title: TaskType;
  state: Recoil.RecoilValueReadOnly<TasklistType>;
}

const StyledLi = styled.li<{completed: boolean}>`
   font-family: 'Open Sans', sans-serif;
   font-weight: 300;

   list-style: none;
   margin: 0;
   padding: 0;
   cursor: pointer;
   text-decoration: ${(props) => props.completed ? 'line-through' : 'none'};
   color: ${(props) => props.completed ? '#C7C7C7' : 'black'};
   -webkit-user-select: none;
   user-select: none;
   margin-bottom: 8px;

   &:hover {
       text-decoration: ${(props) => {
    const base = (props.completed) ? 'line-through' : '';
    return `${base} underline`;
  }}
   }
`;

const StyledUl = styled.ul`
   margin: 0;
   padding: 0;
`;

function sortTasks(taskA: Task, taskB: Task) {
  if (taskA.done === false && taskB.done === true) {
    return -1;
  } else if (taskA.done === true && taskB.done === false) {
    return 1;
  }

  return taskA.description.localeCompare(taskB.description);
}

const TasklistItem = ({ task, onTaskItemClick }: {task: Task, onTaskItemClick: () => void}) => {
  const setTask = Recoil.useSetRecoilState(SelectedTask);

  const onMouseOver = () => setTask(task);
  const onMouseOut = () => setTask(undefined);

  return <StyledLi completed={task.done} onClick={onTaskItemClick} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>{task.description}</StyledLi>;
};

const BaseTasklist = ({ state }:  {state: Recoil.RecoilState<TasklistType>}) => {
  const list = Recoil.useRecoilValue(state);
  const { updateTask } = useTasklist();

  const onClick = (task: Task) => () => updateTask({ ...task, done: !task.done });

  const options = Object.values(list)
    .sort(sortTasks)
    .map((task, index) => <TasklistItem key={index} task={task} onTaskItemClick={onClick(task)}/>);

  return <StyledUl>{options}</StyledUl>;
};

const StyledTasklist = styled.div`
width: 315px;
text-align: center;
`;

const StyledH2 = styled.h2<{selected: boolean}>`
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;

  font-size: 2em;

  color: ${props => (props.selected) ? '#8F0000' : '#191919'};

  margin: 0 0 8px 0;
  padding: 0;
`;

export const Tasklist = ({ title, state } : TasklistProps) => {
  const [selectedTaskType, setSelectedTaskType] = Recoil.useRecoilState(currentType);
  const onHeaderSelected = () => setSelectedTaskType(title);

  return <StyledTasklist>
    <StyledH2 selected={title === selectedTaskType} onClick={onHeaderSelected}>{title}</StyledH2>
    <BaseTasklist state={state}/>
  </StyledTasklist>;
};
