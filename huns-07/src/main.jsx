import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'

import { Provider } from 'react-redux'
import {Store} from './context/Store.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
  <RouterProvider router={router}/>
</Provider>
)
