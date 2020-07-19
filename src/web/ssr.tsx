import * as React from 'react';

import { About } from './about';

export type SSRComponent = {
  Component: React.ComponentType<unknown>;
  targetId: string;
};

export const serverSidedComponents = [About];

