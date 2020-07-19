import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { serverSidedComponents } from 'web/ssr';
import { App } from './app';

ReactDOM.render(<App />, document.getElementById('application'));

serverSidedComponents.forEach(({ Component, targetId }) => {
  ReactDOM.hydrate(<Component />, document.getElementById(targetId));
});
