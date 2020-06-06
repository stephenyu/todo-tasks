import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Recoil from 'recoil';

const Application = () => <React.Fragment>
  <div>Hello World</div>
</React.Fragment>

const App = () => <Recoil.RecoilRoot>
  <Application />
</Recoil.RecoilRoot>

ReactDOM.render(<App />, document.getElementById('root'));
