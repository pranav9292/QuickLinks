import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import ShortcutCard from './ShortcutCard';
import EmptyState from './EmptyState';
import '../styles/CategoryCard.css';

const CategoryCard = ({ category, onEdit, onDelete, onDeleteShortcut, onEditShortcut }) => {
  return (
    <div className="category-card" style={{ '--accent-color': category.color }}>
      <div className="category-header">
        <div className="category-title">
          <span className="category-icon">{category.icon}</span>
          <h3>{category.name}</h3>
        </div>
        <div className="category-actions">
          <button onClick={() => onEdit(category)} className="icon-btn">
            <Edit2 size={16} />
          </button>
          <button onClick={() => onDelete(category.id)} className="icon-btn">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <div className="shortcuts-container">
        {category.shortcuts.length > 0 ? (
          category.shortcuts.map((shortcut, index) => (
            <ShortcutCard
              key={index}
              shortcut={shortcut}
              accentColor={category.color}
              onDelete={() => onDeleteShortcut(category.id, index)}
              onEdit={() => onEditShortcut(category.id, index, shortcut)}
            />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default CategoryCard;