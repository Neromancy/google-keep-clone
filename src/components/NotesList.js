import React from 'react';
import Note from './Note';
import './NotesList.css';

function NotesList({
  notes,
  updateNote,
  deleteNote,
  togglePinNote,
  changeNoteBackground,
}) {
  const pinnedNotes = notes.filter((note) => note.pinned);
  const otherNotes = notes.filter((note) => !note.pinned);

  if (notes.length === 0) {
    return (
      <div className="notes-empty">
        <svg width="120" height="120" viewBox="0 0 24 24">
          <path
            fill="#e0e0e0"
            d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.11l-.85.6V16h-4v-2.31l-.85-.6A4.997 4.997 0 017 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"
          />
        </svg>
        <p className="notes-empty-text">Catatan yang Anda tambahkan akan muncul di sini</p>
      </div>
    );
  }

  return (
    <div className="notes-container">
      {pinnedNotes.length > 0 && (
        <div className="notes-section">
          <h2 className="notes-section-title">DISEMATKAN</h2>
          <div className="notes-grid">
            {pinnedNotes.map((note) => (
              <Note
                key={note.id}
                note={note}
                updateNote={updateNote}
                deleteNote={deleteNote}
                togglePinNote={togglePinNote}
                changeNoteBackground={changeNoteBackground}
              />
            ))}
          </div>
        </div>
      )}

      {otherNotes.length > 0 && (
        <div className="notes-section">
          {pinnedNotes.length > 0 && (
            <h2 className="notes-section-title">LAINNYA</h2>
          )}
          <div className="notes-grid">
            {otherNotes.map((note) => (
              <Note
                key={note.id}
                note={note}
                updateNote={updateNote}
                deleteNote={deleteNote}
                togglePinNote={togglePinNote}
                changeNoteBackground={changeNoteBackground}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotesList;