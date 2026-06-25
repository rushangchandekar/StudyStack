import React from 'react';
import { Plus, Users, Folder, Trash2, ExternalLink, Info, CheckCircle2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import StatsBanner from '../components/StatsBanner';
import MaterialsList from '../components/MaterialsList';
import Modals from '../components/Modals';

// Simple Helper Icon component (recreating chevron-right to keep code fully self contained)
function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}

export default function DashboardPage({
  setView,
  isDarkMode,
  setIsDarkMode,
  dbStatus,
  activeTab,
  setActiveTab,
  isMockMode,
  user,
  searchQuery,
  setSearchQuery,
  resetMaterialForm,
  setShowAddModal,
  successMsg,
  dashboardStats,
  recentMaterials,
  subjects,
  completionPercentage,
  todos,
  monthlyTargets,
  handleCreateTodo,
  handleToggleTodo,
  handleDeleteTodo,
  handleCreateMonthlyTarget,
  handleToggleMonthlyTarget,
  handleDeleteMonthlyTarget,
  typeFilter,
  setTypeFilter,
  subjectFilter,
  setSubjectFilter,
  creatorFilter,
  setCreatorFilter,
  favoritesOnly,
  setFavoritesOnly,
  filteredMaterials,
  creators,
  getTypeBadge,
  handleToggleFavorite,
  openEditMaterial,
  handleDeleteMaterial,
  setViewingMaterial,
  handleToggleRead,
  materials,
  handleDeleteCreator,
  handleDeleteSubject,
  viewingMaterial,
  showAddModal,
  editingMaterial,
  handleSaveMaterial,
  matType,
  setMatType,
  setUploadedFileUrl,
  uploadedFileUrl,
  handleFileUpload,
  uploadProgress,
  matTitle,
  setMatTitle,
  matUrl,
  setMatUrl,
  matDesc,
  setMatDesc,
  matSubjectId,
  setMatSubjectId,
  matCreatorId,
  setMatCreatorId,
  matTags,
  setMatTags,
  matNotes,
  setMatNotes,
  copyToClipboard,
  showSubjectModal,
  setShowSubjectModal,
  handleSaveSubject,
  newSubName,
  setNewSubName,
  subjectColorPresets,
  newSubColor,
  setNewSubColor,
  showCreatorModal,
  setShowCreatorModal,
  handleSaveCreator,
  newCrName,
  setNewCrName,
  newCrPlatform,
  setNewCrPlatform,
  newCrHandle,
  setNewCrHandle,
  newCrProfileUrl,
  setNewCrProfileUrl
}) {
  const modalProps = {
    showAddModal, setShowAddModal, resetMaterialForm, editingMaterial, handleSaveMaterial,
    matType, setMatType, setUploadedFileUrl, uploadedFileUrl, handleFileUpload, uploadProgress,
    matTitle, setMatTitle, matUrl, setMatUrl, matDesc, setMatDesc, subjects, matSubjectId, setMatSubjectId,
    creators, matCreatorId, setMatCreatorId, matTags, setMatTags, matNotes, setMatNotes,
    viewingMaterial, setViewingMaterial, getTypeBadge, copyToClipboard, handleDeleteMaterial,
    showSubjectModal, setShowSubjectModal, handleSaveSubject, newSubName, setNewSubName,
    subjectColorPresets, newSubColor, setNewSubColor,
    showCreatorModal, setShowCreatorModal, handleSaveCreator, newCrName, setNewCrName,
    newCrPlatform, setNewCrPlatform, newCrHandle, setNewCrHandle, newCrProfileUrl, setNewCrProfileUrl
  };

  return (
    <div className="app-container bg-gradient-glow">
      {/* Dev preview alert banner */}
      {dbStatus === 'offline' && (
        <div className="dev-banner" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
          <Info size={14} />
          <span>Running in Offline Preview Mode. Data is saving locally to your browser storage. Connect your Python Backend to unlock PostgreSQL & Cloud Storage!</span>
        </div>
      )}
      
      {/* 1. Left Sidebar */}
      <Sidebar 
        dbStatus={dbStatus} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMockMode={isMockMode} 
        user={user} 
        isDarkMode={isDarkMode}
        setView={setView}
      />
      
      {/* 2. Main Wrapper */}
      <div className="main-wrapper" style={{ paddingTop: dbStatus === 'offline' ? '30px' : '0' }}>
        {/* Header Bar */}
        <DashboardHeader 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          resetMaterialForm={resetMaterialForm} 
          setShowAddModal={setShowAddModal} 
          dbStatus={dbStatus} 
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        
        {/* Success notifications popup */}
        {successMsg && (
          <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: 'rgba(16, 185, 129, 0.95)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 8px 30px rgba(16, 185, 129, 0.3)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'slideUp 0.3s ease-out'
          }}>
            <CheckCircle2 size={16} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{successMsg}</span>
          </div>
        )}

        {/* 3. Main Views router */}
        <main className="page-container">
          
          {/* VIEW: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <StatsBanner 
              user={user} 
              dashboardStats={dashboardStats} 
              recentMaterials={recentMaterials} 
              subjects={subjects} 
              setActiveTab={setActiveTab} 
              completionPercentage={completionPercentage} 
              materials={materials}
              todos={todos}
              monthlyTargets={monthlyTargets}
              handleCreateTodo={handleCreateTodo}
              handleToggleTodo={handleToggleTodo}
              handleDeleteTodo={handleDeleteTodo}
              handleCreateMonthlyTarget={handleCreateMonthlyTarget}
              handleToggleMonthlyTarget={handleToggleMonthlyTarget}
              handleDeleteMonthlyTarget={handleDeleteMonthlyTarget}
            />
          )}

          {/* VIEW: MATERIALS GRID */}
          {activeTab === 'materials' && (
            <MaterialsList 
              typeFilter={typeFilter} setTypeFilter={setTypeFilter} 
              subjectFilter={subjectFilter} setSubjectFilter={setSubjectFilter} 
              creatorFilter={creatorFilter} setCreatorFilter={setCreatorFilter}
              favoritesOnly={favoritesOnly} setFavoritesOnly={setFavoritesOnly} 
              searchQuery={searchQuery} setSearchQuery={setSearchQuery} 
              filteredMaterials={filteredMaterials} subjects={subjects}
              creators={creators} getTypeBadge={getTypeBadge} 
              handleToggleFavorite={handleToggleFavorite} openEditMaterial={openEditMaterial} 
              handleDeleteMaterial={handleDeleteMaterial} setViewingMaterial={setViewingMaterial} 
              handleToggleRead={handleToggleRead}
            />
          )}

          {/* VIEW: CREATORS MANAGER */}
          {activeTab === 'creators' && (
            <div>
              <div className="view-header">
                <div>
                  <h1 className="page-title text-gradient">Creators Hub</h1>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                    Track resources by the social media creators who shared them.
                  </p>
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowCreatorModal(true)}
                >
                  <Plus size={18} />
                  Add Creator
                </button>
              </div>

              {creators.length === 0 ? (
                <div className="glass-card" style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  <Users size={48} style={{ color: 'var(--border-glow)', marginBottom: '16px' }} />
                  <h3>No creators cataloged yet.</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>Add creators like Love Babbar, Striver, or custom handles.</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                  {creators.map(c => {
                    const count = materials.filter(m => m.creator_id === c.id).length
                    return (
                      <div key={c.id} className="glass-card" style={{ position: 'relative' }}>
                        <button 
                          className="action-btn-mini"
                          style={{ position: 'absolute', top: '16px', right: '16px', color: 'rgba(239,68,68,0.5)' }}
                          onClick={() => handleDeleteCreator(c.id)}
                          title="Remove Creator"
                        >
                          <Trash2 size={15} />
                        </button>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                          <div className="creator-avatar-mini" style={{ width: '42px', height: '42px', fontSize: '1.2rem' }}>
                            {c.name[0]}
                          </div>
                          <div>
                            <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{c.name}</h3>
                            <span className="card-type-badge badge-github" style={{ padding: '2px 6px', fontSize: '0.65rem', marginTop: '4px' }}>
                              {c.platform}
                            </span>
                          </div>
                        </div>

                        {c.handle && (
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                            Handle: <span style={{ color: 'var(--accent-purple)', fontWeight: 500 }}>{c.handle}</span>
                          </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          <span>Saved Materials: {count}</span>
                          {c.profile_url && (
                            <a 
                              href={c.profile_url} 
                              target="_blank" 
                              rel="noreferrer" 
                              style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                            >
                              Visit Page
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* VIEW: SUBJECTS MANAGER */}
          {activeTab === 'subjects' && (
            <div>
              <div className="view-header">
                <div>
                  <h1 className="page-title text-gradient">Subjects Boards</h1>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                    Group materials into custom subjects or boards.
                  </p>
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowSubjectModal(true)}
                >
                  <Plus size={18} />
                  New Subject
                </button>
              </div>

              {subjects.length === 0 ? (
                <div className="glass-card" style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  <Folder size={48} style={{ color: 'var(--border-glow)', marginBottom: '16px' }} />
                  <h3>No subjects created yet.</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>Create boards like Database Systems, Algorithms, Placements.</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                  {subjects.map(s => {
                    const count = materials.filter(m => m.subject_id === s.id).length
                    return (
                      <div key={s.id} className="glass-card" style={{ borderLeft: `5px solid ${s.color}`, position: 'relative' }}>
                        <button 
                          className="action-btn-mini"
                          style={{ position: 'absolute', top: '16px', right: '16px', color: 'rgba(239,68,68,0.5)' }}
                          onClick={() => handleDeleteSubject(s.id)}
                          title="Delete Board"
                        >
                          <Trash2 size={15} />
                        </button>
                        
                        <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-header)', fontWeight: 700, marginBottom: '6px' }}>{s.name}</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>Subject Board</p>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Files Saved: {count}</span>
                          <button 
                            className="btn-secondary btn" 
                            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                            onClick={() => {
                              setSubjectFilter(s.id)
                              setActiveTab('materials')
                            }}
                          >
                            View Materials
                            <ChevronRightIcon />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <Modals {...modalProps} />
    </div>
  );
}
