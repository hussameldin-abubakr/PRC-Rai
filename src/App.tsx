import React from 'react';
import { Router, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree';

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;