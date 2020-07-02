import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Recoil from 'recoil';
import styled, { createGlobalStyle }from 'styled-components';

import { TaskType } from 'web/types/task';
import { TaskInput } from 'web/task_input/task_input';
import { Tasklist } from 'web/task_list/task_list';
import { SelectedTask } from 'web/atoms/selected_task.atom';
import { useTasklist } from 'web/hooks/useTasklist';
import { TodayTasklist, TomorrowTasklist, SometimeTasklist } from 'web/atoms/Tasklist.atom';

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
  width: 1300px;
  align-items: center;
`;

const TasklistDiv = styled.div`
  display: flex;
  width: 960px;
  justify-content: space-around;
`;

const TaskInputDiv = styled.div`
  margin-bottom: 8px;
`;

const Application = () => {
  const selectedTask = Recoil.useRecoilValue(SelectedTask);
  const { updateTask } = useTasklist();

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedTask !== undefined) {
        switch (event.key) {
          case "1":
            updateTask({ ...selectedTask, type: TaskType.today });
            break;
          case "2":
            updateTask({ ...selectedTask, type: TaskType.tomorrow });
            break;
          case "3":
            updateTask({ ...selectedTask, type: TaskType.sometime });
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedTask]);

  return (<Container>
    <TaskInputDiv>
      <TaskInput />
    </TaskInputDiv>
    <TasklistDiv>
      <Tasklist title={TaskType.today} state={TodayTasklist} />
      <Tasklist title={TaskType.tomorrow} state={TomorrowTasklist} />
      <Tasklist title={TaskType.sometime} state={SometimeTasklist} />
    </TasklistDiv>
  </Container>);
};

const ApplicationDiv = styled.div`
display: flex;
justify-content: center;
`;

const App = () => <Recoil.RecoilRoot>
  <GlobalStyle/>
  <ApplicationDiv>
    <React.Suspense fallback={<div>Loading...</div>}>
      <Application />
    </React.Suspense>
  </ApplicationDiv>
</Recoil.RecoilRoot>;

ReactDOM.render(<App />, document.getElementById('root'));
