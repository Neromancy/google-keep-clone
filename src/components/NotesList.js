import React from 'react';
import Note from './Note';
import './NotesList.css';

function NotesList({
  notes,
  updateNote,
  deleteNote,
  togglePinNote,
  changeNoteBackground,
  toggleArchiveNote,
  isArchiveView,
}) {
  const pinnedNotes = notes.filter((note) => note.pinned && !isArchiveView);
  const otherNotes = notes.filter((note) => !note.pinned);

  if (notes.length === 0) {
    return (
      <div className="notes-empty">
        <p className="notes-empty-text">{isArchiveView ? 'Arsip Anda kosong' : 'Tidak ada catatan'}</p>
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
              <Note key={note.id} note={note} updateNote={updateNote} deleteNote={deleteNote} togglePinNote={togglePinNote} changeNoteBackground={changeNoteBackground} toggleArchiveNote={toggleArchiveNote} isArchiveView={isArchiveView}/>
            ))}
          </div>
        </div>
      )}

      {otherNotes.length > 0 && (
        <div className="notes-section">
          {pinnedNotes.length > 0 && <h2 className="notes-section-title">LAINNYA</h2>}
          <div className="notes-grid">
            {otherNotes.map((note) => (
              <Note key={note.id} note={note} updateNote={updateNote} deleteNote={deleteNote} togglePinNote={togglePinNote} changeNoteBackground={changeNoteBackground} toggleArchiveNote={toggleArchiveNote} isArchiveView={isArchiveView}/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotesList;