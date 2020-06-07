import * as React from 'react';
import * as Recoil from 'recoil';
import styled from 'styled-components';

import { TaskList as TaskListType } from 'web/atoms/TaskList.atom';
import { TaskType, Task } from 'web/types/task';

interface TaskListProps {
  title: TaskType;
  state: Recoil.RecoilState<TaskListType>;
}

const StyledLi = styled.li<{completed: boolean}>`
    list-style: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
    text-decoration: ${(props) => props.completed ? 'line-through' : 'none'}
`;

const StyledUl = styled.ul`
    margin: 0;
    padding: 0;
`;

const TaskListItem = ({ task, onTaskItemClick }: {task: Task, onTaskItemClick: () => void}) =>
  <StyledLi completed={task.done} onClick={onTaskItemClick}>{task.description}</StyledLi>;

const BaseTaskList = ({ state }:  {state: Recoil.RecoilState<TaskListType>}) => {
  const [list, setList] = Recoil.useRecoilState(state);

  const onClick = (task: Task) =>
    () => setList(prevList => ({ ...prevList, [task.date]: { ...task, done: !task.done } }));

  const options = Object.values(list).map((task, index) =>
    <TaskListItem key={index} task={task} onTaskItemClick={onClick(task)}/>);

  return <StyledUl>{options}</StyledUl>;
};

export const TaskList = ({ title, state } : TaskListProps) => <div>
  <h2>{title}</h2>
  <BaseTaskList state={state}/>
</div>;
