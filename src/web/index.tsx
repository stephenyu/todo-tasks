import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Recoil from 'recoil';
import styled, { createGlobalStyle }from 'styled-components';

import { TaskType } from 'web/types/task';
import { TaskInput } from 'web/task_input/task_input';
import { TaskList } from 'web/task_list/task_list';
import { TodayTaskList, TomorrowTaskList, SometimeTaskList } from 'web/atoms/TaskList.atom';

const GlobalStyle = createGlobalStyle`
  * {
    font-size: 16px;
  }

  body {
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;600&display=swap');
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 960px;
  align-items: center;
`;

const TaskListDiv = styled.div`
  display: flex;
  width: 960px;
  justify-content: space-around;
`;

const TaskInputDiv = styled.div`
  margin-bottom: 8px;
`;

const Application = () => <Container>
  <TaskInputDiv>
    <TaskInput />
  </TaskInputDiv>
  <TaskListDiv>
    <TaskList title={TaskType.today} state={TodayTaskList} />
    <TaskList title={TaskType.tomorrow} state={TomorrowTaskList} />
    <TaskList title={TaskType.sometime} state={SometimeTaskList} />
  </TaskListDiv>
</Container>;

const ApplicationDiv = styled.div`
display: flex;
justify-content: center;
`;

const App = () => <Recoil.RecoilRoot>
  <GlobalStyle/>
  <ApplicationDiv>
    <Application />
  </ApplicationDiv>
</Recoil.RecoilRoot>;

ReactDOM.render(<App />, document.getElementById('root'));
