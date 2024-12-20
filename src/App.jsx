import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import SearchPageResults from './pages/SearchResults';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
{
  path: '/',
  element: <Home/>,
  errorElement: <NotFoundPage/>,
},
{
  path: '/results/:year/:circuitId',
  element: <SearchPageResults/>,
  errorElement: <NotFoundPage/>,
},
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App
