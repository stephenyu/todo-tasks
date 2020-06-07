import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Recoil from 'recoil';

import { TaskType } from 'web/types/task';
import { TaskInput } from 'web/task_input/task_input';
import { TaskList } from 'web/task_list/task_list';
import { TodayTaskList, TomorrowTaskList, SometimeTaskList } from 'web/atoms/TaskList.atom';

const Application = () => <React.Fragment>
  <TaskInput />
  <TaskList title={TaskType.today} state={TodayTaskList} />
  <TaskList title={TaskType.tomorrow} state={TomorrowTaskList} />
  <TaskList title={TaskType.sometime} state={SometimeTaskList} />
</React.Fragment>;

const App = () => <Recoil.RecoilRoot>
  <Application />
</Recoil.RecoilRoot>;

ReactDOM.render(<App />, document.getElementById('root'));
