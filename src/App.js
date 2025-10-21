import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const savedNotes = localStorage.getItem('keepNotes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error("Gagal mem-parsing catatan dari localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('keepNotes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (noteData) => {
    const newNote = {
      id: Date.now(),
      title: noteData.title,
      content: noteData.content,
      createdAt: new Date().toISOString(),
      pinned: false,
      background: '#FFFFFF', // Properti background default
    };
    setNotes([newNote, ...notes]);
  };

  const updateNote = (id, updatedNote) => {
    setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const togglePinNote = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  };

  const changeNoteBackground = (id, background) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, background: background } : note
      )
    );
  };

  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <NoteForm addNote={addNote} />
        <NotesList
          notes={notes}
          updateNote={updateNote}
          deleteNote={deleteNote}
          togglePinNote={togglePinNote}
          changeNoteBackground={changeNoteBackground}
        />
      </main>
    </div>
  );
}

export default App;