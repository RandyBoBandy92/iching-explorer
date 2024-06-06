import { useState } from "react";
import "./optionsmenu.css";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useEffect } from "react";

function OptionsMenu() {
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const { readingMode } = useContext(GlobalContext);

  useEffect(() => {
    if (readingMode.mode === "reading") {
      setShowOptionsMenu(false);
    }
  }, [readingMode]);

  return (
    <div className="options-menu">
      <button
        disabled={readingMode.mode === "reading"}
        onClick={() => setShowOptionsMenu(!showOptionsMenu)}
        className="options-btn"
      >
        Options
      </button>
      <div
        className={`options-menu-content ${
          showOptionsMenu ? "options-enabled" : "options-closed"
        }`}
      >
        <h2>Options</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptates
          dolor aspernatur! Ipsam maxime adipisci sint harum dolorem vero
          voluptatum voluptates debitis beatae nihil, dolores eum mollitia ipsum
          at voluptas!
        </p>
      </div>
    </div>
  );
}

export default OptionsMenu;
