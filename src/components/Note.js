import React, { useState, useEffect, useRef } from 'react';
import ColorPalette from './ColorPalette';
import './Note.css';

const UnarchiveIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20.54,5.23L19.12,3.81L17.71,5.23L16.29,3.81L14.88,5.23L13.46,3.81L12.05,5.23L10.64,3.81L9.22,5.23L7.81,3.81L6.39,5.23L5,3.81L3.58,5.23L2.17,3.81L3.58,2.39L5,3.81L6.39,2.39L7.81,3.81L9.22,2.39L10.64,3.81L12.05,2.39L13.46,3.81L14.88,2.39L16.29,3.81L17.71,2.39L19.12,3.81L20.54,2.39L21.95,3.81L20.54,5.23M3,6H21V22H3V6M12,18A4,4 0 0,0 16,14H8A4,4 0 0,0 12,18M12,10A2,2 0 0,1 14,12H10A2,2 0 0,1 12,10Z" /></svg>);
const ArchiveIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3,3H21V7H3V3M4,8H20V21H4V8M9.5,13.5H14.5V12H9.5V13.5Z" /></svg>);

function Note({
  note,
  updateNote,
  deleteNote,
  togglePinNote,
  changeNoteBackground,
  toggleArchiveNote,
  isArchiveView,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const [showPalette, setShowPalette] = useState(false);
  const noteRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (noteRef.current && !noteRef.current.contains(event.target)) {
        setShowPalette(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => { document.removeEventListener('mousedown', handleClickOutside); };
  }, [noteRef]);

  const handleSave = () => {
    updateNote(note.id, { ...note, title: editTitle, content: editContent });
    setIsEditing(false);
  };
  const handleCancel = () => { setIsEditing(false); setEditTitle(note.title); setEditContent(note.content); };
  const handleDelete = () => { if (window.confirm('Anda yakin ingin menghapus catatan ini?')) { deleteNote(note.id); } };
  const handleBackgroundChange = (background) => { changeNoteBackground(note.id, background); };

  const noteStyle = {
    backgroundColor: note.background.startsWith('data:image') || note.background.startsWith('url(') ? '#FFFFFF' : note.background,
    backgroundImage: note.background.startsWith('data:image') || note.background.startsWith('url(') ? `url(${note.background.replace(/url\((['"]?)(.*)\1\)/gi, '$2')})` : 'none',
  };
  
  return (
    <div className="note" style={noteStyle} ref={noteRef}>
      {isEditing ? (
        <div className="note-edit">
        </div>
      ) : (
        <div className="note-view" onClick={() => setIsEditing(true)}>
          <div className="note-header">
            {note.title && <h3 className="note-title">{note.title}</h3>}
            {!isArchiveView && (
              <button className="note-action-button pin-button" onClick={(e) => { e.stopPropagation(); togglePinNote(note.id); }} title={note.pinned ? 'Lepas sematan' : 'Sematkan catatan'}>
                <svg fill={note.pinned ? '#202124' : 'currentColor'} width="24" height="24" viewBox="0 0 24 24"><path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" /></svg>
              </button>
            )}
          </div>
          <p className="note-content">{note.content}</p>
          <div className="note-actions">
            <button className="note-action-button" title="Opsi latar belakang" onClick={(e) => { e.stopPropagation(); setShowPalette(!showPalette); }}><svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,13.44 19.62,14.79 18.91,16L16,13.09V13A3,3 0 0,0 13,10H10A3,3 0 0,0 7,13V13.09L4.09,16C3.38,14.79 3,13.44 3,12A9,9 0 0,1 12,3M12,20.5A8.5,8.5 0 0,1 3.5,12C3.5,10.29 4.04,8.73 5,7.44L16.56,19C15.27,20 13.71,20.5 12,20.5Z" /></svg></button>
            <button className="note-action-button" title={isArchiveView ? 'Batalkan Pengarsipan' : 'Arsipkan'} onClick={(e) => { e.stopPropagation(); toggleArchiveNote(note.id); }}>{isArchiveView ? <UnarchiveIcon /> : <ArchiveIcon />}</button>
            <button className="note-action-button" title="Hapus catatan" onClick={(e) => { e.stopPropagation(); handleDelete(); }}><svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg></button>
            {showPalette && (<ColorPalette onSelect={handleBackgroundChange} onClose={() => setShowPalette(false)} />)}
          </div>
        </div>
      )}
    </div>
  );
}

export default Note;