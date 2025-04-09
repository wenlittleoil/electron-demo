import { useState } from 'react'
import {
  createBrowserRouter,
  NavLink,
  Outlet,
  RouterProvider,
} from "react-router";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DarkMode from './pages/dark-mode'
import Devices from './pages/devices'

function Examples() {
  return (
    <div>
      <div 
        className="nav-list"
        style={{
          fontStyle: 'italic',
        }}
      >
        <NavLink to="/examples/dark-mode" end>
          Dark Mode
        </NavLink>
        <NavLink to="/examples/devices" end>
          Device Access
        </NavLink>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <div 
          className="nav-list" 
          style={{
            fontSize: '18px',
          }}
        >
          <NavLink to="/examples">
            示例
          </NavLink>
          <NavLink to="/others">
            其他
          </NavLink>
        </div>
        <Outlet />
      </div>
    ),
    children: [
      {
        path: 'examples',
        Component: Examples,
        children: [
          { 
            path: "dark-mode",
            Component: DarkMode 
          },
          { 
            path: "devices", 
            Component: Devices 
          },
        ],
      },
      {
        path: 'others',
        element: <div>others</div>,
      },
    ],
  },
]);

function App() {
  return (
    <div className='app-wrap'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App
