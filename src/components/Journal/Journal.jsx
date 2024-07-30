import React from "react";
import "./journal.css";
import { useJournalHooks } from "../../hooks/useJournalHooks";
import { useState } from "react";

const JournalModal = () => {
  // The journal modal is a form that allows the user to save notes about their reading
  // It will automatically capture the reading they obtained and allow them to add a title and notes
  // Results are saved to local storage

  const {
    maximize,
    showJournalModal,
    handleCloseJournal,
    handleMaximize,
    saveJournalEntry,
    journalNotes,
    setJournalNotes,
  } = useJournalHooks();

  const [formInvalid, setFormInvalid] = useState(false);

  function handleSaveJournalEntry() {
    // check if at least title is filled out
    if (journalNotes.title.length > 0) {
      saveJournalEntry();
      handleCloseJournal();
    } else {
      // we will put a class on the input to show it's invalid
      setFormInvalid(true);
    }
  }

  function handleChangeTitle(event) {
    if (event.target.value.length > 0) {
      setFormInvalid(false);
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
          className={formInvalid ? "invalid" : ""}
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
