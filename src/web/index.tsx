import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Recoil from 'recoil';

import { Message } from 'web/message/message';

const Application = () => <React.Fragment>
  <Message />
</React.Fragment>

const App = () => <Recoil.RecoilRoot>
  <Application />
</Recoil.RecoilRoot>

ReactDOM.render(<App />, document.getElementById('root'));
