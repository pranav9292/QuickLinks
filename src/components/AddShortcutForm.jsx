import React, { useState, useEffect } from 'react';
import '../styles/Forms.css';

const AddShortcutForm = ({ categories, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    category: ''
  });

  useEffect(() => {
    if (categories.length > 0) {
      setFormData(prev => ({ ...prev, category: categories[0].id }));
    }
  }, [categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.url) return;
    onSubmit(formData);
    setFormData({ name: '', url: '', category: categories[0]?.id || '' });
  };

  return (
    <>
      <div className="modal-header">Add New Shortcut</div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="e.g., YouTube"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>URL</label>
          <input
            type="url"
            placeholder="e.g., https://youtube.com"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="modal-buttons">
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add Shortcut
          </button>
        </div>
      </form>
    </>
  );
};

export default AddShortcutForm;