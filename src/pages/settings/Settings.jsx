import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import "./settings.css";

const Settings = () => {
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
