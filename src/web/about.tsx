import * as React from 'react';

import { SSRComponent } from 'web/ssr';

const InnerAbout = () => {
  const [counter, setCounter] = React.useState(0);

  const add = () => setCounter(prev => prev + 1);

  return <div>
    <span>Hello from About {counter}</span>
    <button onClick={add}>Add</button>
  </div>;
};

export const About: SSRComponent = {
  Component: InnerAbout,
  targetId: 'about'
};
