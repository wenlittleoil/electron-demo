import { useState } from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import styles from './App.module.scss';
import DarkMode from './pages/dark-mode'
import Devices from './pages/devices'
import { 
  Examples,
} from './containers/layouts';
import NavLink from './components/NavLink';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <div 
          className={styles["nav-list"]}
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
            index: true,
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
