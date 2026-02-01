import React from 'react';
import { X } from 'lucide-react';
import { getFavicon } from '../utils/helpers';
import '../styles/ShortcutCard.css';

const ShortcutCard = ({ shortcut, accentColor, onDelete }) => {
  return (
    <a
      href={shortcut.url}
      target="_blank"
      rel="noopener noreferrer"
      className="shortcut-card"
      style={{ '--accent-color': accentColor }}
    >
      <img 
        src={getFavicon(shortcut.url)} 
        alt={shortcut.name}
        className="shortcut-favicon"
        onError={(e) => e.target.src = 'https://www.google.com/s2/favicons?domain=google.com&sz=64'}
      />
      <span className="shortcut-name">{shortcut.name}</span>
      <button
        className="shortcut-delete"
        onClick={(e) => {
          e.preventDefault();
          onDelete();
        }}
      >
        <X size={16} />
      </button>
    </a>
  );
};

export default ShortcutCard;