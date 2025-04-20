import {
  // createBrowserRouter, // h5历史路由
  createHashRouter, // hash路由
  Outlet,
  RouterProvider,
} from "react-router";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import styles from './App.module.scss';
import DarkMode from './pages/dark-mode'
import Devices from './pages/devices'
import KeyboardShortcuts from './pages/keyboard-shortcuts'
import { 
  Examples,
} from './containers/layouts';
import NavLink from './components/NavLink';

const router = createHashRouter([
  {
    path: "/",
    element: (
      <div>
        <div 
          className={styles["nav-list"]}
          style={{
            fontSize: '22px',
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
          {
            path: 'keyboard-shortcuts',
            Component: KeyboardShortcuts
          }
        ],
      },
      {
        path: 'others',
        element: <div>others</div>,
      },
    ],
  },
  {
    path: "*",
    element: <div>404 没有找到匹配的页面路由</div>,
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
