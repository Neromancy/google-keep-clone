import React from 'react';
import './Sidebar.css';

const NotesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" /></svg>
);
const ArchiveIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20.54,5.23L19.12,3.81L17.71,5.23L16.29,3.81L14.88,5.23L13.46,3.81L12.05,5.23L10.64,3.81L9.22,5.23L7.81,3.81L6.39,5.23L5,3.81L3.58,5.23L2.17,3.81L3.58,2.39L5,3.81L6.39,2.39L7.81,3.81L9.22,2.39L10.64,3.81L12.05,2.39L13.46,3.81L14.88,2.39L16.29,3.81L17.71,2.39L19.12,3.81L20.54,2.39L21.95,3.81L20.54,5.23M3,6H21V22H3V6M12,18A4,4 0 0,0 16,14H8A4,4 0 0,0 12,18M12,10A2,2 0 0,1 14,12H10A2,2 0 0,1 12,10Z" /></svg>
);

function Sidebar({ view, setView }) {
  return (
    <nav className="sidebar">
      <ul>
        <li
          className={view === 'notes' ? 'active' : ''}
          onClick={() => setView('notes')}
        >
          <NotesIcon />
          <span>Catatan</span>
        </li>
        <li
          className={view === 'archive' ? 'active' : ''}
          onClick={() => setView('archive')}
        >
          <ArchiveIcon />
          <span>Arsip</span>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;