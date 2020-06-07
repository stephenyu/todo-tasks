import * as React from 'react';
import * as Recoil from 'recoil';
import styled from 'styled-components';

import { SelectedTaskType } from 'web/atoms/Selected_TaskType.atom';
import { SelectedTask } from 'web/atoms/selected_task.atom';
import { TaskList as TaskListType } from 'web/atoms/TaskList.atom';
import { TaskType, Task } from 'web/types/task';

interface TaskListProps {
  title: TaskType;
  state: Recoil.RecoilState<TaskListType>;
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

const TaskListItem = ({ task, onTaskItemClick }: {task: Task, onTaskItemClick: () => void}) => {
  const setTask = Recoil.useSetRecoilState(SelectedTask);

  const onMouseOver = () => setTask(task);
  const onMouseOut = () => setTask(undefined);

  return <StyledLi completed={task.done} onClick={onTaskItemClick} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>{task.description}</StyledLi>;
};

const BaseTaskList = ({ state }:  {state: Recoil.RecoilState<TaskListType>}) => {
  const [list, setList] = Recoil.useRecoilState(state);

  const onClick = (task: Task) =>
    () => setList(prevList => ({ ...prevList, [task.date]: { ...task, done: !task.done } }));

  const options = Object.values(list).map((task, index) =>
    <TaskListItem key={index} task={task} onTaskItemClick={onClick(task)}/>);

  return <StyledUl>{options}</StyledUl>;
};

const StyledTaskList = styled.div`
width: 315px;
`;

const StyledH2 = styled.h2<{selected: boolean}>`
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;

  font-size: 2em;

  color: ${props => (props.selected) ? '#8F0000' : '#191919'};

  margin: 0 0 8px 0;
  padding: 0;
`;

export const TaskList = ({ title, state } : TaskListProps) => {
  const [selectedTaskType, setSelectedTaskType] = Recoil.useRecoilState(SelectedTaskType);
  const onHeaderSelected = () => setSelectedTaskType(title);

  return <StyledTaskList>
    <StyledH2 selected={title === selectedTaskType} onClick={onHeaderSelected}>{title}</StyledH2>
    <BaseTaskList state={state}/>
  </StyledTaskList>;
};
