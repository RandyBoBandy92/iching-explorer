// ThemeToggle.js
import { useEffect } from "react";

const ThemeToggle = () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");

  // if light/dark use emojis for moon and sun

  const themeEmoji = currentTheme === "dark" ? "🌞" : "🌙";

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      const userPrefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.setAttribute(
        "data-theme",
        userPrefersDark ? "dark" : "light"
      );
    }
  }, []);

  return <button onClick={toggleTheme}>{themeEmoji}</button>;
};

export default ThemeToggle;
