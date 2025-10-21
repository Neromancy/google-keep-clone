import React, { useRef } from 'react';
import './ColorPalette.css';

const ImageIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21,19V5C21,3.89 20.1,3 19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19M8.5,13.5L11,16.5L14.5,12L19,18H5L8.5,13.5Z" /></svg>);

const colors = ['#FFFFFF', '#F28B82', '#FBBC04', '#FFF475', '#CCFF90', '#A7FFEB', '#CBF0F8', '#AECBFA', '#D7AEFB', '#FDCFE8'];
const images = ['foods.png', 'music.png', 'travel.png'];

function ColorPalette({ onSelect, onClose }) {
  const fileInputRef = useRef(null);

  const handleSelect = (background) => {
    onSelect(background);
    onClose();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => { handleSelect(reader.result); };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = (e) => { e.stopPropagation(); };

  return (
    <div className="palette-container" onClick={handleClick}>
      <button className="palette-item no-bg" onClick={() => handleSelect('#FFFFFF')} title="Tanpa Latar Belakang">{/* SVG No BG */}</button>
      {colors.map((color) => (<button key={color} className="palette-item" style={{ backgroundColor: color }} onClick={() => handleSelect(color)} />))}
      <div className="palette-divider" />
      {images.map((image) => (<button key={image} className="palette-item" style={{ backgroundImage: `url(/images/${image})` }} onClick={() => handleSelect(`url(/images/${image})`)} />))}
      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />
      <button className="palette-item" title="Unggah gambar" onClick={() => fileInputRef.current.click()}><ImageIcon /></button>
    </div>
  );
}

export default ColorPalette;