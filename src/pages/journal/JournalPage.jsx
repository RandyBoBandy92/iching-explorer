import { useJournalHooks } from "../../hooks/useJournalHooks";
import "./journalpage.css";

function JournalPage() {
  const { journalEntries } = useJournalHooks();

  function renderEntries(entry) {
    const unixToLocalTime = new Date(entry.time).toLocaleString();
    const hasChangingHex =
      entry.hexagram.number !== entry.transformedHexagram.number;
    return (
      <a href={`/${entry.link}`} className="journal-entry-link">
        <div key={entry.time} className="journal-entry">
          <p>{unixToLocalTime}</p>
          {hasChangingHex ? (
            <p className="unicode-hex">
              {entry.hexagram.unicode} <span className="arrow">➡</span>{" "}
              {entry.transformedHexagram.unicode}
            </p>
          ) : (
            <p className="unicode-hex">{entry.hexagram.unicode}</p>
          )}
          <p>{entry.notes}</p>
        </div>
      </a>
    );
  }

  return (
    <div>
      <h1>Journal Page</h1>
      <div className="journal-entries">
        {journalEntries.map((entry) => renderEntries(entry))}
      </div>
    </div>
  );
}

export default JournalPage;
