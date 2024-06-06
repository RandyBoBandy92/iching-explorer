import "./journal.css";
import { useJournalHooks } from "../../hooks/useJournalHooks";

const JournalModal = () => {
  // Your component code here

  const {
    maximize,
    showJournalModal,
    handleCloseJournal,
    handleMaximize,
    saveEntryToLocalStorage,
    journalNotes,
    setJournalNotes,
  } = useJournalHooks();

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
        <button onClick={saveEntryToLocalStorage} id="save-journal">
          💾
        </button>
        <textarea
          value={journalNotes}
          onChange={(event) => {
            setJournalNotes(event.target.value);
          }}
          name=""
          id=""
          placeholder="notes"
        ></textarea>
      </div>
    </div>
  );
};

export default JournalModal;
