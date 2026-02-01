import React, { useState } from 'react';
import '../styles/Forms.css';

const AddCategoryForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    color: '#FF6B6B'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    (formData);
    setFormData({ name: '', icon: '', color: '#FF6B6B' });
  };

  return (
    <>
      <div className="modal-header">Add New Category</div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Category Name</label>
          <input
            type="text"
            placeholder="e.g., Work"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Icon (emoji)</label>
          <input
            type="text"
            placeholder="e.g., 💼"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            maxLength={2}
          />
        </div>
        <div className="form-group">
          <label>Accent Color</label>
          <div className="color-picker-wrapper">
            <input
              type="color"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            />
            <input
              type="text"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              placeholder="#FF6B6B"
            />
          </div>
        </div>
        <div className="modal-buttons">
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add Category
          </button>
        </div>
      </form>
    </>
  );
};

export default AddCategoryForm;