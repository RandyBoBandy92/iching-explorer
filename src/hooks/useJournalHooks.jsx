import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useState } from "react";
import { generateUUID } from "../utilities/toolbelt";

export function useJournalHooks() {
  const { lines, hexagram, transformedHexagram } = useContext(GlobalContext);
  const [journalNotes, setJournalNotes] = useState({ title: "", note: "" });
  const [maximize, setMaximize] = useState(false);

  const [journalEntries, setJournalEntries] = useState(loadJournalEntries());

  function loadJournalEntries() {
    const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    const reversedEntries = entries.reverse();
    return reversedEntries;
  }

  const { showJournalModal, setShowJournalModal } = useContext(GlobalContext);

  function handleCloseJournal() {
    setShowJournalModal(!showJournalModal);
  }

  function closeJournal() {
    setShowJournalModal(false);
  }

  function handleMaximize() {
    setMaximize(!maximize);
  }

  function saveJournalEntry() {
    const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    const newEntry = createEntry();
    entries.push(newEntry);
    localStorage.setItem("journalEntries", JSON.stringify(entries));
    setJournalNotes({ title: "", note: "" });
  }

  function deleteJournalEntry(uuid) {
    if (!uuid) {
      // this is an old entry that lacks a uuid
      // For backwards compatibility, check if all the entries have uuids
      // if not, add them
      const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
      const fixedEntries = entries.map((entry) => {
        if (!entry.id) {
          entry.id = generateUUID();
        }
        return entry;
      });
      localStorage.setItem("journalEntries", JSON.stringify(fixedEntries));
      setJournalEntries(fixedEntries);
      alert(
        "You are using the older version of the journal entries. Your journal entries have been migrated to the new version. Please press Delete again."
      );
      return;
    }

    const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

    const updatedEntries = entries.filter((entry) => entry.id !== uuid);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    setJournalEntries(updatedEntries);
  }

  function buildSearchString() {
    // figure out if hexagram.number and transformedHexagram.number are the same or not
    const hexagramsAreEqual = hexagram.number === transformedHexagram.number;
    let searchString;
    // search string looks like ?search=hexagram.number=>transformedHexagram.number
    if (hexagramsAreEqual) {
      searchString = `?search=${hexagram.number}`;
    } else {
      searchString = `?search=${hexagram.number}=>${transformedHexagram.number}`;
    }
    return searchString;
  }

  function createEntry() {
    // get current time and date
    const date = new Date();
    const dateTimeAsUnix = date.getTime();

    const entry = {
      id: generateUUID(),
      time: dateTimeAsUnix,
      journalNotes: journalNotes,
      lines,
      link: buildSearchString(),
      hexagram,
      transformedHexagram,
    };
    return entry;
  }

  return {
    saveJournalEntry,
    handleMaximize,
    maximize,
    handleCloseJournal,
    journalNotes,
    setJournalNotes,
    showJournalModal,
    setShowJournalModal,
    journalEntries,
    setJournalEntries,
    deleteJournalEntry,
    closeJournal,
  };
}
