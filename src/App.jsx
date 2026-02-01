import React, { useState, useEffect } from 'react';
import { Plus, Search, Download, Upload, RefreshCw } from 'lucide-react';
import CategoryCard from './components/CategoryCard';
import Modal from './components/Modal';
import AddShortcutForm from './components/AddShortcutForm';
import AddCategoryForm from './components/AddCategoryForm';
import EditCategoryForm from './components/EditCategoryForm';
import { defaultData } from './data/defaultData';
import './styles/App.css';

const App = () => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('shortcutsData');
    return saved ? JSON.parse(saved) : defaultData;
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddShortcutOpen, setIsAddShortcutOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('shortcutsData', JSON.stringify(data));
  }, [data]);

  // Filter categories based on search
  const filteredCategories = data.categories.map(category => ({
    ...category,
    shortcuts: category.shortcuts.filter(s =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.url.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => 
    searchTerm === '' || category.shortcuts.length > 0
  );

  // Add shortcut
  const handleAddShortcut = (shortcutData) => {
    setData(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === shortcutData.category
          ? { ...cat, shortcuts: [...cat.shortcuts, { name: shortcutData.name, url: shortcutData.url }] }
          : cat
      )
    }));
    setIsAddShortcutOpen(false);
  };

  // Add category
  const handleAddCategory = (categoryData) => {
    const newCategory = {
      id: categoryData.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
      name: categoryData.name,
      icon: categoryData.icon || '📁',
      color: categoryData.color,
      shortcuts: []
    };

    setData(prev => ({
      ...prev,
      categories: [...prev.categories, newCategory]
    }));
    setIsAddCategoryOpen(false);
  };

  // Edit category
  const handleEditCategory = (categoryData) => {
    setData(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === editingCategory.id
          ? { ...cat, name: categoryData.name, icon: categoryData.icon, color: categoryData.color }
          : cat
      )
    }));
    setIsEditCategoryOpen(false);
    setEditingCategory(null);
  };

  // Delete category
  const handleDeleteCategory = (categoryId) => {
    if (!window.confirm('Delete this category and all its shortcuts?')) return;
    setData(prev => ({
      ...prev,
      categories: prev.categories.filter(cat => cat.id !== categoryId)
    }));
  };

  // Delete shortcut
  const handleDeleteShortcut = (categoryId, shortcutIndex) => {
    if (!window.confirm('Delete this shortcut?')) return;
    setData(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === categoryId
          ? { ...cat, shortcuts: cat.shortcuts.filter((_, i) => i !== shortcutIndex) }
          : cat
      )
    }));
  };

  // Export data
  const handleExport = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shortcuts-backup.json';
    a.click();
  };

  // Import data
  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedData = JSON.parse(event.target.result);
          setData(importedData);
          alert('Data imported successfully!');
        } catch (error) {
          alert('Error importing data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  // Reset data
  const handleReset = () => {
    if (!window.confirm('Reset to default shortcuts? This will delete all your custom data.')) return;
    setData(defaultData);
  };

  // Open edit modal
  const openEditModal = (category) => {
    setEditingCategory(category);
    setIsEditCategoryOpen(true);
  };

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>⚡ QuickLinks</h1>
          <p>Your personalized command center</p>
        </header>

        <div className="search-container">
          <div className="search-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-box"
              placeholder="Search shortcuts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="controls">
          <button className="btn btn-primary" onClick={() => setIsAddCategoryOpen(true)}>
            <Plus size={18} />
            Add Category
          </button>
          <button className="btn" onClick={handleExport}>
            <Download size={18} />
            Export
          </button>
          <button className="btn" onClick={handleImport}>
            <Upload size={18} />
            Import
          </button>
          <button className="btn" onClick={handleReset}>
            <RefreshCw size={18} />
            Reset
          </button>
        </div>

        <div className="categories-grid">
          {filteredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={openEditModal}
              onDelete={handleDeleteCategory}
              onDeleteShortcut={handleDeleteShortcut}
            />
          ))}
        </div>
      </div>

      <button className="fab" onClick={() => setIsAddShortcutOpen(true)}>
        <Plus size={32} />
      </button>

      {/* Add Shortcut Modal */}
      <Modal isOpen={isAddShortcutOpen} onClose={() => setIsAddShortcutOpen(false)}>
        <AddShortcutForm 
          categories={data.categories}
          onSubmit={handleAddShortcut}
          onCancel={() => setIsAddShortcutOpen(false)}
        />
      </Modal>

      {/* Add Category Modal */}
      <Modal isOpen={isAddCategoryOpen} onClose={() => setIsAddCategoryOpen(false)}>
        <AddCategoryForm
          onSubmit={handleAddCategory}
          onCancel={() => setIsAddCategoryOpen(false)}
        />
      </Modal>

      {/* Edit Category Modal */}
      <Modal isOpen={isEditCategoryOpen} onClose={() => setIsEditCategoryOpen(false)}>
        <EditCategoryForm
          category={editingCategory}
          onSubmit={handleEditCategory}
          onCancel={() => setIsEditCategoryOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default App;