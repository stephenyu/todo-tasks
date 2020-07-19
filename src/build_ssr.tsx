import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { serverSidedComponents } from './web/ssr';

export const ssrHtml = serverSidedComponents.reduce<Record<string, string>>((map, { Component, targetId }) => ({ ...map, [targetId]: ReactDOMServer.renderToString(<Component/>) }), {});
