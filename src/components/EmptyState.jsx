import React from 'react';
import { Sparkles } from 'lucide-react';
import '../styles/EmptyState.css';

const EmptyState = () => {
  return (
    <div className="empty-state">
      <Sparkles size={32} />
      <p>No shortcuts yet</p>
    </div>
  );
};

export default EmptyState;