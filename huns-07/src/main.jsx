import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store.js';

import AddTask from './pages/addTask.jsx'
import Home from './pages/Home.jsx';
import ViewTask from './pages/ViewTask.jsx'
import CompletedTasks from './pages/CompletedTasks.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path='/add-task' element={<AddTask />} />
      <Route path='/view-pending-tasks' element={<ViewTask />} />
      <Route path='/view-completed-tasks' element={<CompletedTasks />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
