import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useState } from "react";

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

  function handleMaximize() {
    setMaximize(!maximize);
  }

  function saveJournalEntry() {
    const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    const newEntry = createEntry();
    entries.push(newEntry);
    localStorage.setItem("journalEntries", JSON.stringify(entries));
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
  };
}
