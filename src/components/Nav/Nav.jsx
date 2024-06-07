import { NavLink } from "react-router-dom";
import "./nav.css";
import HomeIcon from "../Icons/HomeIcon/HomeIcon";
import JournalIcon from "../Icons/HomeIcon/JournalIcon";
import SettingsIcon from "../Icons/HomeIcon/SettingsIcon";

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <NavLink to="/" className="nav-item">
        <HomeIcon className="icon" />
        <span className="nav-label">Home</span>
      </NavLink>
      <NavLink to="/journal" className="nav-item">
        <JournalIcon className="icon" />
        <span className="nav-label">Journal</span>
      </NavLink>
      <NavLink to="/settings" className="nav-item">
        <SettingsIcon className="icon" />
        <span className="nav-label">Settings</span>
      </NavLink>
    </div>
  );
};

export default BottomNav;
