import React from "react";
import "./journalbtn.css";
import IconNotebookEditOutline from "../Icons/HomeIcon/JournalIcon";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const JournalBtn = () => {
  // state to toggle journal modal

  const { hexagram, showJournalModal, setShowJournalModal } =
    useContext(GlobalContext);

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
