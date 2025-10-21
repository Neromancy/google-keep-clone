import React from 'react';
import './ColorPalette.css';

const colors = [
  '#FFFFFF', '#F28B82', '#FBBC04', '#FFF475', '#CCFF90',
  '#A7FFEB', '#CBF0F8', '#AECBFA', '#D7AEFB', '#FDCFE8',
];

// Sesuaikan nama file dengan gambar di folder public/images
const images = [
  'foods.png',
  'music.png',
  'travel.png',
];

function ColorPalette({ onSelect, onClose }) {
  const handleSelect = (background) => {
    onSelect(background);
    onClose();
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="palette-container" onClick={handleClick}>
      <button
        className="palette-item no-bg"
        onClick={() => handleSelect('#FFFFFF')}
        title="Tanpa Latar Belakang"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.364 5.63604C19.9261 7.19816 20.887 9.29437 20.9837 11.5377C21.0805 13.781 20.2995 15.9557 18.8168 17.6569C17.3341 19.358 15.2662 20.4578 13.0363 20.7412C10.8064 21.0245 8.57279 20.4687 6.71497 19.1812C4.85716 17.8938 3.5101 15.9616 2.92138 13.8164C2.33266 11.6712 2.54845 9.40935 3.53032 7.39134C4.51219 5.37334 6.19632 3.75543 8.28515 2.82567C10.374 1.89591 12.7214 1.72291 14.95 2.34997" stroke="#5f6368" strokeWidth="2" strokeLinecap="round"/>
          <path d="M5 5L19 19" stroke="#5f6368" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {colors.map((color) => (
        <button
          key={color}
          className="palette-item"
          style={{ backgroundColor: color }}
          onClick={() => handleSelect(color)}
        />
      ))}

      <div className="palette-divider" />

      {images.map((image) => (
        <button
          key={image}
          className="palette-item"
          style={{ backgroundImage: `url(/images/${image})` }}
          onClick={() => handleSelect(`url(/images/${image})`)}
        />
      ))}
    </div>
  );
}

export default ColorPalette;