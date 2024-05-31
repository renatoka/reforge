import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Intro from 'src/frontend/pages/Intro/Intro';
import NotFound from 'src/frontend/pages/NotFound/NotFound';

const router = createHashRouter([
  {
    path: '/',
    element: <Intro />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider
      router={router}
      future={{ v7_startTransition: true }}
    />
  </React.StrictMode>,
);
