import React, { useState, useEffect } from 'react';
import '../styles/Forms.css';

const EditShortcutForm = ({ shortcut, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    url: ''
  });

  useEffect(() => {
    if (shortcut) {
      setFormData({
        name: shortcut.name,
        url: shortcut.url
      });
    }
  }, [shortcut]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.url) return;
    onSubmit(formData);
  };

  if (!shortcut) return null;

  return (
    <>
      <div className="modal-header">Edit Shortcut</div>
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
        <div className="modal-buttons">
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};

export default EditShortcutForm;