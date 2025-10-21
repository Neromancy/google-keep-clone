import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('notes'); // 'notes' atau 'archive'

  useEffect(() => {
    const savedNotes = localStorage.getItem('keepNotes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) { console.error("Error parsing notes from localStorage", e); }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('keepNotes', JSON.stringify(notes));
    } catch (e) {
      console.error("Gagal menyimpan catatan, kemungkinan localStorage penuh.", e);
      alert("Gagal menyimpan catatan. Penyimpanan mungkin penuh. Coba hapus beberapa catatan dengan gambar besar.");
    }
  }, [notes]);

  const addNote = (noteData) => {
    const newNote = {
      id: Date.now(),
      title: noteData.title,
      content: noteData.content,
      createdAt: new Date().toISOString(),
      pinned: false,
      background: '#FFFFFF',
      isArchived: false,
    };
    setNotes([newNote, ...notes]);
  };
  
  const toggleArchiveNote = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isArchived: !note.isArchived, pinned: false } : note
      )
    );
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

  const filteredNotes = notes
    .filter(note => {
      if (view === 'notes') return !note.isArchived;
      if (view === 'archive') return note.isArchived;
      return true;
    })
    .filter(note => {
      const query = searchQuery.toLowerCase();
      const titleMatch = note.title.toLowerCase().includes(query);
      const contentMatch = note.content.toLowerCase().includes(query);
      return titleMatch || contentMatch;
    });

  return (
    <div className="app-container">
      <Sidebar view={view} setView={setView} />
      
      <div className="main-content-area">
        <Header
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
        />
        <main className="app-main">
          {view === 'notes' && !searchQuery && <NoteForm addNote={addNote} />}
          <NotesList
            notes={filteredNotes}
            updateNote={updateNote}
            deleteNote={deleteNote}
            togglePinNote={togglePinNote}
            changeNoteBackground={changeNoteBackground}
            toggleArchiveNote={toggleArchiveNote}
            isArchiveView={view === 'archive'}
          />
        </main>
      </div>
    </div>
  );
}

export default App;