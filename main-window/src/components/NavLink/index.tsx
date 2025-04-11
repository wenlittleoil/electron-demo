import {
  NavLink as _NavLink,
  NavLinkProps,
} from "react-router";
import styles from '@/App.module.scss';

interface IProps extends NavLinkProps {}

const NavLink:React.FC<IProps> = (props) => {
  return (
    <_NavLink 
      className={({ isActive }) => isActive ? styles['active'] : ''}
      {...props} 
    />
  );
}

export default NavLink;
