import { useContext } from "react";
import "./journal.css";
import { GlobalContext } from "../../context/GlobalContext";
import { useState } from "react";

const JournalModal = () => {
  // Your component code here
  const [maximize, setMaximize] = useState(false);
  const { showJournalModal, setShowJournalModal } = useContext(GlobalContext);

  function handleCloseJournal() {
    setShowJournalModal(!showJournalModal);
  }

  function handleMaximize() {
    setMaximize(!maximize);
  }

  return (
    <div
      className={`${showJournalModal ? "show" : "hide"} ${
        maximize ? "maximize" : ""
      }`}
      id="journal-modal"
    >
      <div className="modal-container">
        <button onClick={handleCloseJournal} id="close-journal">
          X
        </button>
        <button onClick={handleMaximize} id="maximize-toggle">
          O
        </button>
        <button id="save-journal">💾</button>
        <textarea name="" id="" placeholder="notes"></textarea>
      </div>
    </div>
  );
};

export default JournalModal;
