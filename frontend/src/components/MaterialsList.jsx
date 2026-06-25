import React from 'react';
import { BookOpen, Heart, Edit3, Trash2, CheckCircle2 } from 'lucide-react';

export default function MaterialsList({ 
  typeFilter, setTypeFilter, subjectFilter, setSubjectFilter, creatorFilter, setCreatorFilter,
  favoritesOnly, setFavoritesOnly, searchQuery, setSearchQuery, filteredMaterials, subjects,
  creators, getTypeBadge, handleToggleFavorite, openEditMaterial, handleDeleteMaterial,
  setViewingMaterial, handleToggleRead
}) {
  return (
    <>

              <div className="view-header">
                <div>
                  <h1 className="page-title text-gradient">Study Materials</h1>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                    Access, sort, and search all your links, files, and cheat sheets.
                  </p>
                </div>
              </div>

              {/* Filters toolbar */}
              <div className="glass-card filters-row">
                <div className="filters-group">
                  {/* Type Filter */}
                  <select 
                    className="select-filter"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="google_drive">Google Drive</option>
                    <option value="website">Websites</option>
                    <option value="pdf">PDF Documents</option>
                    <option value="docx">Word Docs</option>
                    <option value="youtube">YouTube Videos</option>
                    <option value="github">GitHub Repos</option>
                    <option value="other">Other</option>
                  </select>

                  {/* Subject Filter */}
                  <select 
                    className="select-filter"
                    value={subjectFilter}
                    onChange={(e) => setSubjectFilter(e.target.value)}
                  >
                    <option value="all">All Subjects</option>
                    {subjects.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>

                  {/* Creator Filter */}
                  <select 
                    className="select-filter"
                    value={creatorFilter}
                    onChange={(e) => setCreatorFilter(e.target.value)}
                  >
                    <option value="all">All Creators</option>
                    {creators.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.platform})</option>
                    ))}
                  </select>

                  {/* Favorites Filter */}
                  <button 
                    className={`btn ${favoritesOnly ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                    onClick={() => setFavoritesOnly(!favoritesOnly)}
                  >
                    <Heart size={14} className={favoritesOnly ? 'fill-current' : ''} />
                    Starred Only
                  </button>
                </div>

                <div className="filters-group">
                  {(typeFilter !== 'all' || subjectFilter !== 'all' || creatorFilter !== 'all' || favoritesOnly || searchQuery) && (
                    <button 
                      className="btn btn-secondary" 
                      style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                      onClick={() => {
                        setTypeFilter('all')
                        setSubjectFilter('all')
                        setCreatorFilter('all')
                        setFavoritesOnly(false)
                        setSearchQuery('')
                      }}
                    >
                      Clear Filters
                    </button>
                  )}
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Found {filteredMaterials.length} materials</span>
                </div>
              </div>

              {/* Grid of Materials */}
              {filteredMaterials.length === 0 ? (
                <div className="glass-card" style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  <BookOpen size={48} style={{ color: 'var(--border-glow)', marginBottom: '16px' }} />
                  <h3>No resources match your filters.</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>Try clearing filters or add a new material card.</p>
                </div>
              ) : (
                <div className="materials-grid">
                  {filteredMaterials.map(m => {
                    const sub = subjects.find(s => s.id === m.subject_id)
                    const cr = creators.find(c => c.id === m.creator_id)
                    
                    return (
                      <div key={m.id} className="glass-card material-card">
                        
                        {/* Top card bar: badges + star */}
                        <div className="card-top">
                          {getTypeBadge(m.type)}
                          
                          <div className="card-actions-top">
                            <button 
                              className={`action-btn-mini favorite ${m.is_favorite ? 'active' : ''}`}
                              onClick={() => handleToggleFavorite(m)}
                              title={m.is_favorite ? "Unstar" : "Star"}
                            >
                              <Heart size={16} fill={m.is_favorite ? "currentColor" : "none"} />
                            </button>
                            <button 
                              className="action-btn-mini"
                              onClick={() => openEditMaterial(m)}
                              title="Edit"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button 
                              className="action-btn-mini"
                              onClick={() => handleDeleteMaterial(m.id)}
                              style={{ color: 'rgba(239, 68, 68, 0.6)' }}
                              title="Delete"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>

                        {/* Title and description */}
                        <h3 
                          className="material-title"
                          onClick={() => setViewingMaterial(m)}
                        >
                          {m.title}
                        </h3>
                        <p className="material-description">{m.description || 'No description provided.'}</p>

                        {/* Subject */}
                        {sub && (
                          <span 
                            className="card-subject-chip" 
                            style={{ backgroundColor: `${sub.color}15`, color: sub.color, border: `1px solid ${sub.color}25` }}
                          >
                            {sub.name}
                          </span>
                        )}

                        {/* Tags */}
                        {m.tags && m.tags.length > 0 && (
                          <div className="card-tags">
                            {m.tags.map((tag, idx) => (
                              <span key={idx} className="tag-badge">#{tag}</span>
                            ))}
                          </div>
                        )}

                        {/* Footer details: Creator + completion toggler */}
                        <div className="card-footer">
                          {cr ? (
                            <a 
                              href={cr.profile_url || '#'} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="creator-attribution"
                            >
                              <div className="creator-avatar-mini">
                                {cr.name[0]}
                              </div>
                              <span>{cr.name}</span>
                            </a>
                          ) : (
                            <span>Unknown Source</span>
                          )}

                          <div 
                            className={`read-toggle ${m.is_read ? 'read' : 'unread'}`}
                            onClick={() => handleToggleRead(m)}
                          >
                            <CheckCircle2 size={14} />
                            <span>{m.is_read ? 'Completed' : 'To Read'}</span>
                          </div>
                        </div>

                      </div>
                    )
                  })}
                </div>
              )}
    </>
  );
}
