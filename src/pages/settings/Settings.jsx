import { useEffect } from "react";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import "./settings.css";
import { APP_NAME } from "../../utilities/constants";

const Settings = () => {
  useEffect(() => {
    document.title = `${APP_NAME} | Settings`;
  }, []);
  return (
    <div id="settings" className="page">
      <h1>Settings</h1>
      <div className="setting theme">
        <h2>Theme:</h2>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Settings;
