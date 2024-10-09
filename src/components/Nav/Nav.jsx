import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "./nav.css";
import HomeIcon from "../Icons/HomeIcon/HomeIcon";
import JournalIcon from "../Icons/HomeIcon/JournalIcon";
import SettingsIcon from "../Icons/HomeIcon/SettingsIcon";

const Nav = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    { to: "/", icon: HomeIcon, label: "Home" },
    { to: "/journal", icon: JournalIcon, label: "Journal" },
    { to: "/settings", icon: SettingsIcon, label: "Settings" },
  ];

  return (
    <>
      {isDesktop ? (
        <nav className={`desktop-nav ${isCollapsed ? "collapsed" : ""}`}>
          <div className="nav-header">
            <span className="company-name">I-Ching Explorer</span>
            <button className="collapse-btn" onClick={toggleCollapse}>
              {isCollapsed ? "≡" : "×"}
            </button>
          </div>
          <ul className="nav-items">
            {navItems.map(({ to, icon: Icon, label }) => (
              <li key={to}>
                <NavLink to={to} className="nav-item">
                  <Icon className="icon" />
                  <span className="nav-label">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      ) : (
        <div className="bottom-nav">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} className="nav-item">
              <Icon className="icon" />
              <span className="nav-label">{label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
};

export default Nav;
