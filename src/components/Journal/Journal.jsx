import "./journal.css";
import { useJournalHooks } from "../../hooks/useJournalHooks";

const JournalModal = () => {
  // Your component code here

  const {
    maximize,
    showJournalModal,
    handleCloseJournal,
    handleMaximize,
    saveJournalEntry,
    journalNotes,
    setJournalNotes,
  } = useJournalHooks();

  function handleSaveJournalEntry() {
    // check if at least title is filled out
    if (journalNotes.title.length > 0) {
      saveJournalEntry();
    } else {
      // we will put a class on the input to show it's invalid
      const journalInput = document.getElementById("journal-title");
      journalInput.classList.add("invalid");
    }
  }

  function handleChangeTitle(event) {
    if (event.target.value.length > 0) {
      const journalInput = document.getElementById("journal-title");
      journalInput.classList.remove("invalid");
    }
    setJournalNotes({ ...journalNotes, title: event.target.value });
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
        <button onClick={handleSaveJournalEntry} id="save-journal">
          💾
        </button>
        <input
          id="journal-title"
          value={journalNotes.title}
          maxLength={120}
          onChange={(event) => {
            handleChangeTitle(event);
          }}
          type="text"
          placeholder="What was your question? (required)"
        />
        <textarea
          maxLength={500}
          value={journalNotes.note}
          onChange={(event) => {
            setJournalNotes({ ...journalNotes, note: event.target.value });
          }}
          name=""
          id=""
          placeholder="notes (optional)"
        ></textarea>
      </div>
    </div>
  );
};

export default JournalModal;
