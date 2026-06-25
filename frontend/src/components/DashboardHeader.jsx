import React from 'react';
import { Search, Plus, Sun, Moon } from 'lucide-react';

export default function DashboardHeader({ 
  searchQuery, 
  setSearchQuery, 
  resetMaterialForm, 
  setShowAddModal, 
  dbStatus,
  isDarkMode,
  setIsDarkMode,
  activeTab,
  setActiveTab 
}) {
  return (
        <header className="header-bar">
          <div className="search-container">
            <Search size={18} className="text-secondary" />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search materials, tags, notes..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'materials') {
                  setActiveTab('materials');
                }
              }}
            />
          </div>
          
          <div className="header-actions">
            <button 
              className="ss-theme-toggle" 
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle theme"
              style={{
                background: 'transparent',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
              }}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button 
              className="btn btn-primary"
              onClick={() => {
                resetMaterialForm()
                setShowAddModal(true)
              }}
            >
              <Plus size={18} />
              Add Material
            </button>
            
            {/* DB Status Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <span className="dot" style={{ 
                display: 'inline-block', 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                backgroundColor: dbStatus === 'cloud_db' ? 'var(--success)' : dbStatus === 'local_db' ? '#a78bfa' : '#f59e0b'
              }}></span>
              {dbStatus === 'cloud_db' ? 'Cloud Server' : dbStatus === 'local_db' ? 'Dev Local' : 'Browser DB'}
            </div>
          </div>
        </header>
  );
}
