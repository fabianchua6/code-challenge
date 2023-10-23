import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Problem1 from './pages/Problem1';
import Problem2 from './pages/Problem2';
import Problem3 from './pages/Problem3';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'problem1',
        element: <Problem1 />,
      },
      {
        path: 'problem2',
        element: <Problem2 />,
      },
      {
        path: 'problem3',
        element: <Problem3 />,
      },
    ],
  },
]);

root.render(
  <StrictMode>
    <ColorModeScript />
    <RouterProvider router={router} />
  </StrictMode>
);
