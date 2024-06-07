import { useJournalHooks } from "../../hooks/useJournalHooks";
import "./journalpage.css";

function JournalPage() {
  const { journalEntries } = useJournalHooks();

  function renderEntries(entry) {
    const unixToLocalTime = new Date(entry.time).toLocaleString();
    const hasChangingHex =
      entry.hexagram.number !== entry.transformedHexagram.number;
    return (
      <div key={entry.time} className="journal-entry">
        <p>{unixToLocalTime}</p>
        {hasChangingHex ? (
          <div className="unicode-hex transformed">
            <div className="unicode-primary">
              <h4>{entry.hexagram.number}</h4>
              <p>{entry.hexagram.unicode}</p>
            </div>
            <span className="arrow">➡</span>
            <div className="unicode-transformed">
              <h4>{entry.transformedHexagram.number}</h4>
              <p>{entry.transformedHexagram.unicode}</p>
            </div>
          </div>
        ) : (
          <p className="unicode-hex">{entry.hexagram.unicode}</p>
        )}
        <h2>{entry.journalNotes.title}</h2>
        <details>
          <summary>Notes</summary>
          <p>{entry.journalNotes.note}</p>
        </details>
        <a href={`/${entry.link}`} className="journal-entry-link">
          View Reading
        </a>
      </div>
    );
  }

  return (
    <div id="journal-page">
      <h1>Journal</h1>
      <div className="journal-entries">
        {journalEntries.map((entry) => renderEntries(entry))}
      </div>
    </div>
  );
}

export default JournalPage;
