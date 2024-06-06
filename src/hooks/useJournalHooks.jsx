import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useState } from "react";

export function useJournalHooks() {
  const { lines } = useContext(GlobalContext);
  const [journalNotes, setJournalNotes] = useState("");
  const [maximize, setMaximize] = useState(false);

  const [journalEntries, setJournalEntries] = useState(loadJournalEntries());

  function loadJournalEntries() {
    JSON.parse(localStorage.getItem("journalEntries")) || [];
  }

  const { showJournalModal, setShowJournalModal } = useContext(GlobalContext);

  function handleCloseJournal() {
    setShowJournalModal(!showJournalModal);
  }

  function handleMaximize() {
    setMaximize(!maximize);
  }

  function saveJournalEntry() {
    const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    const newEntry = createEntry();
    entries.push(newEntry);
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }

  function createEntry() {
    const entry = {
      notes: journalNotes,
      lines,
    };
    return entry;
  }

  return {
    saveEntryToLocalStorage: saveJournalEntry,
    handleMaximize,
    handleCloseJournal,
    journalNotes,
    setJournalNotes,
    showJournalModal,
    setShowJournalModal,
    journalEntries,
    setJournalEntries,
  };
}
