import { Outlet } from "react-router";
import styles from '@/App.module.scss';
import NavLink from "@/components/NavLink";

export default function Examples() {
  return (
    <div>
      <div 
        className={styles["nav-list"]}
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
        <NavLink to="/examples/keyboard-shortcuts" end>
          Keyboard Shortcuts & Deep Links
        </NavLink>
        <NavLink to="/examples/native-file-drag-drop" end>
          Native File Drag & Drop
        </NavLink>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
