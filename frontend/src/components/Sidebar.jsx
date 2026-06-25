import React from 'react';
import { Sparkles, TrendingUp, BookOpen, Users, Folder } from 'lucide-react';
import { UserButton } from '@clerk/clerk-react';

export default function Sidebar({ dbStatus, activeTab, setActiveTab, isMockMode, user, isDarkMode, setView, mobileMenuOpen }) {
  const userButtonAppearance = {
    elements: {
      userButtonPopoverCard: {
        backgroundColor: isDarkMode ? '#0f0f1b !important' : '#ffffff !important',
        border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.08) !important' : '1px solid #e2e8f0 !important',
        boxShadow: isDarkMode 
          ? '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3) !important' 
          : '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.08) !important',
      },
      userButtonPopoverMain: {
        backgroundColor: isDarkMode ? '#0f0f1b !important' : '#ffffff !important',
      },
      userButtonPopoverActions: {
        backgroundColor: isDarkMode ? '#0f0f1b !important' : '#ffffff !important',
      },
      userButtonPopoverActionButton: {
        backgroundColor: isDarkMode ? '#0f0f1b !important' : '#ffffff !important',
        color: isDarkMode ? '#f8fafc !important' : '#0f172a !important',
        transition: 'all 0.15s ease !important',
        '&:hover': {
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08) !important' : '#f1f5f9 !important',
        }
      },
      userButtonPopoverActionButtonText: {
        color: isDarkMode ? '#f8fafc !important' : '#0f172a !important',
        fontWeight: '500 !important',
      },
      userButtonPopoverActionButtonIcon: {
        color: isDarkMode ? '#94a3b8 !important' : '#475569 !important',
      },
      userPreviewMainIdentifier: {
        color: isDarkMode ? '#f8fafc !important' : '#0f172a !important',
        fontWeight: '600 !important',
      },
      userPreviewSecondaryIdentifier: {
        color: isDarkMode ? '#94a3b8 !important' : '#64748b !important',
      },
      userButtonPopoverFooter: {
        borderTop: isDarkMode ? '1px solid rgba(255, 255, 255, 0.08) !important' : '1px solid #f1f5f9 !important',
        backgroundColor: isDarkMode ? '#0b0a14 !important' : '#f8fafc !important',
        '& a': {
          color: isDarkMode ? '#94a3b8 !important' : '#64748b !important',
        }
      }
    }
  };

  return (
      <aside className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`} style={{ paddingTop: dbStatus === 'offline' ? '42px' : '24px' }}>
        <div 
          className="sidebar-brand" 
          onClick={() => setView('landing')} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <img src="/logo_symbol.png" alt="StudyStack" style={{ width: '38px', height: '38px', objectFit: 'contain' }} />
          <span className="sidebar-title">StudyStack</span>
        </div>
        
        <ul className="sidebar-menu">
          <li 
            className={`sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <TrendingUp />
            <span>Dashboard</span>
          </li>
          <li 
            className={`sidebar-item ${activeTab === 'materials' ? 'active' : ''}`}
            onClick={() => setActiveTab('materials')}
          >
            <BookOpen />
            <span>Materials</span>
          </li>
          <li 
            className={`sidebar-item ${activeTab === 'creators' ? 'active' : ''}`}
            onClick={() => setActiveTab('creators')}
          >
            <Users />
            <span>Creators Hub</span>
          </li>
          <li 
            className={`sidebar-item ${activeTab === 'subjects' ? 'active' : ''}`}
            onClick={() => setActiveTab('subjects')}
          >
            <Folder />
            <span>Subjects</span>
          </li>
        </ul>
        
        <div className="sidebar-user">
          {isMockMode ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
              <div className="creator-avatar-mini" style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}>
                RS
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Rushang Student</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--accent-purple)' }}>Dev Preview Mode</div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
              <UserButton 
                afterSignOutUrl="/" 
                appearance={userButtonAppearance}
              />
              <span>{user?.firstName || 'My Profile'}</span>
            </div>
          )}
        </div>
      </aside>
      
  );
}
