import {
  // createBrowserRouter, // h5历史路由
  createHashRouter, // hash路由
  Outlet,
  RouterProvider,
} from "react-router";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import styles from './App.module.scss';
import DarkMode from './pages/dark-mode';
import Devices from './pages/devices';
import KeyboardShortcuts from './pages/keyboard-shortcuts';
import NativeFileDragDrop from './pages/native-file-drag-drop';
import Notifications from './pages/notifications';
import Spellchecker from './pages/spellchecker';
import { 
  Examples,
} from './containers/layouts';
import NavLink from './components/NavLink';
import classNames from "classnames";
import {
  lazyLoadRouteComponent,
  lazyLoadRouteElement,
} from "./utils/lazyLoadRoutes";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <div>
        <div className={classNames(styles["nav-list"], styles.customTopTitleBar)}>
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
            // Component: DarkMode, 
            // Component: lazyLoadRouteComponent("dark-mode"),
            element: lazyLoadRouteElement("dark-mode"),
          },
          { 
            path: "devices", 
            // Component: Devices,
            // Component: lazyLoadRouteComponent("devices"),
            element: lazyLoadRouteElement("devices"),
          },
          {
            path: "keyboard-shortcuts",
            // Component: KeyboardShortcuts,
            // Component: lazyLoadRouteComponent("keyboard-shortcuts"),
            element: lazyLoadRouteElement("keyboard-shortcuts"),
          }, 
          {
            path: "native-file-drag-drop",
            // Component: NativeFileDragDrop,
            // Component: lazyLoadRouteComponent("native-file-drag-drop"),
            element: lazyLoadRouteElement("native-file-drag-drop"),
          },
          {
            path: "notifications",
            // Component: Notifications,
            // Component: lazyLoadRouteComponent("notifications"),
            element: lazyLoadRouteElement("notifications"),
          },
          {
            path: "spellchecker",
            // Component: Spellchecker,
            // Component: lazyLoadRouteComponent("spellchecker"),
            element: lazyLoadRouteElement("spellchecker"),
          },
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
