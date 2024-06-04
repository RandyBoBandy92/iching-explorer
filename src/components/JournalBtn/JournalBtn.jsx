import "./journalbtn.css";
import IconNotebookEditOutline from "../Icons/HomeIcon/JournalIcon";
import { useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const JournalBtn = () => {
  // state to toggle journal modal

  const { hexagram } = useContext(GlobalContext);

  const [showJournalModal, setShowJournalModal] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setShowJournalModal(!showJournalModal);
        }}
        className={`journal-btn ${
          hexagram.number ? "journal-btn-show" : "journal-btn-hide"
        }`}
      >
        <IconNotebookEditOutline />
      </button>
    </>
  );
};

export default JournalBtn;
