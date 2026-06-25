import React from 'react';
import { X, UploadCloud, Calendar, ExternalLink, Copy, Trash2, Layers } from 'lucide-react';

export default function Modals(props) {
  const {
    showAddModal, setShowAddModal, resetMaterialForm, editingMaterial, handleSaveMaterial,
    matType, setMatType, setUploadedFileUrl, uploadedFileUrl, handleFileUpload, uploadProgress,
    matTitle, setMatTitle, matUrl, setMatUrl, matDesc, setMatDesc, subjects, matSubjectId, setMatSubjectId,
    creators, matCreatorId, setMatCreatorId, matTags, setMatTags, matNotes, setMatNotes,
    viewingMaterial, setViewingMaterial, getTypeBadge, copyToClipboard, handleDeleteMaterial,
    showSubjectModal, setShowSubjectModal, handleSaveSubject, newSubName, setNewSubName,
    subjectColorPresets, newSubColor, setNewSubColor,
    showCreatorModal, setShowCreatorModal, handleSaveCreator, newCrName, setNewCrName,
    newCrPlatform, setNewCrPlatform, newCrHandle, setNewCrHandle, newCrProfileUrl, setNewCrProfileUrl
  } = props;

  return (
    <>
{/* --- 4. MODALS DIALOGS --- */}

      {/* MODAL: ADD / EDIT MATERIAL */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              className="modal-close" 
              onClick={() => {
                setShowAddModal(false)
                resetMaterialForm()
              }}
            >
              <X size={20} />
            </button>
            
            <h2 className="modal-title">{editingMaterial ? 'Edit Study Material' : 'Add Study Material'}</h2>
            
            <form onSubmit={handleSaveMaterial}>
              {/* Type selector */}
              <div className="form-group">
                <label className="form-label">Resource Type</label>
                <select 
                  className="form-select"
                  value={matType}
                  onChange={(e) => {
                    setMatType(e.target.value)
                    setUploadedFileUrl('')
                  }}
                >
                  <option value="google_drive">Google Drive Folders/Links</option>
                  <option value="website">Websites / Medium Articles</option>
                  <option value="pdf">PDF E-Books / Docs</option>
                  <option value="docx">Word / DOCX Files</option>
                  <option value="youtube">YouTube Video Tutorials</option>
                  <option value="github">GitHub Projects / Code</option>
                  <option value="other">Other Reference</option>
                </select>
              </div>

              {/* Dynamic input: Link or File Upload */}
              {['pdf', 'docx'].includes(matType) && !uploadedFileUrl ? (
                <div className="form-group">
                  <label className="form-label">Select Document File</label>
                  <div className="upload-zone" onClick={() => document.getElementById('file-picker').click()}>
                    <UploadCloud size={32} />
                    <div className="upload-text">Drag & Drop or Click to Upload</div>
                    <div className="upload-subtext">PDF, DOCX, TXT, or images up to 10MB</div>
                    <input 
                      type="file" 
                      id="file-picker" 
                      style={{ display: 'none' }}
                      accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                      onChange={handleFileUpload}
                    />
                  </div>
                  {uploadProgress >= 0 && (
                    <div style={{ marginTop: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="upload-progress-container">
                        <div className="upload-progress-bar" style={{ width: `${uploadProgress}%` }}></div>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}

              {/* URL field (shown for links, or pre-filled for uploaded files) */}
              {(!['pdf', 'docx'].includes(matType) || uploadedFileUrl || matUrl) && (
                <div className="form-group">
                  <label className="form-label">{['pdf', 'docx'].includes(matType) ? 'Document URL' : 'Link URL'}</label>
                  <input 
                    type="url" 
                    className="form-input"
                    placeholder="https://"
                    value={matUrl}
                    onChange={(e) => setMatUrl(e.target.value)}
                    onBlur={(e) => handleUrlBlur(e.target.value)}
                    required
                  />
                  {uploadedFileUrl && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--success)', marginTop: '6px' }}>
                      <span>✓ Upload completed successfully!</span>
                      <button 
                        type="button" 
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'underline' }}
                        onClick={() => {
                          setUploadedFileUrl('')
                          setMatUrl('')
                        }}
                      >
                        Re-upload file
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Title */}
              <div className="form-group">
                <label className="form-label">Material Title</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="e.g., placements cheatsheet"
                  value={matTitle}
                  onChange={(e) => setMatTitle(e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div className="form-group">
                <label className="form-label">Brief Description</label>
                <textarea 
                  className="form-textarea"
                  placeholder="What is this resource about?"
                  value={matDesc}
                  onChange={(e) => setMatDesc(e.target.value)}
                />
              </div>

              {/* Subject Boards & Creators */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Subject Board</label>
                  <select 
                    className="form-select"
                    value={matSubjectId}
                    onChange={(e) => setMatSubjectId(e.target.value)}
                  >
                    <option value="">Uncategorized</option>
                    {subjects.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Shared By Creator</label>
                  <select 
                    className="form-select"
                    value={matCreatorId}
                    onChange={(e) => setMatCreatorId(e.target.value)}
                  >
                    <option value="">No Creator Attribution</option>
                    {creators.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.platform})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div className="form-group">
                <label className="form-label">Tags (comma separated)</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="cheat-sheet, tricks, c++, exam"
                  value={matTags}
                  onChange={(e) => setMatTags(e.target.value)}
                />
              </div>

              {/* Personal Notes */}
              <div className="form-group">
                <label className="form-label">Personal Study Notes</label>
                <textarea 
                  className="form-textarea"
                  placeholder="E.g., Read section 4 before practicing questions, must revise..."
                  value={matNotes}
                  onChange={(e) => setMatNotes(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyItems: 'center', gap: '12px', marginTop: '24px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  {editingMaterial ? 'Update Material' : 'Save Material'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowAddModal(false)
                    resetMaterialForm()
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW DETAILS AND NOTES */}
      {viewingMaterial && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '640px' }}>
            <button className="modal-close" onClick={() => setViewingMaterial(null)}>
              <X size={20} />
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              {getTypeBadge(viewingMaterial.type)}
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={12} />
                {new Date(viewingMaterial.created_at).toLocaleDateString()}
              </span>
            </div>

            <h2 className="modal-title" style={{ fontSize: '1.8rem', lineHeight: '1.3', marginBottom: '12px' }}>{viewingMaterial.title}</h2>
            
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {subjects.find(s => s.id === viewingMaterial.subject_id) && (
                <span className="card-subject-chip" style={{ 
                  backgroundColor: `${subjects.find(s => s.id === viewingMaterial.subject_id).color}15`, 
                  color: subjects.find(s => s.id === viewingMaterial.subject_id).color,
                  border: `1px solid ${subjects.find(s => s.id === viewingMaterial.subject_id).color}25`
                }}>
                  {subjects.find(s => s.id === viewingMaterial.subject_id).name}
                </span>
              )}
              {viewingMaterial.tags && viewingMaterial.tags.map((t, idx) => (
                <span key={idx} className="tag-badge">#{t}</span>
              ))}
            </div>

            {/* Description section */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Description</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                {viewingMaterial.description || 'No description provided.'}
              </p>
            </div>

            {/* Notes Section */}
            <div className="glass-card" style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', padding: '20px', marginBottom: '24px' }}>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--accent-purple)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={14} />
                Personal Revision Notes
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                {viewingMaterial.notes || 'No notes added yet. Edit this material to add revision highlights, exam hints, or reminders.'}
              </p>
            </div>

            {/* Creator info */}
            {creators.find(c => c.id === viewingMaterial.creator_id) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: 'rgba(255,255,255,0.01)', borderRadius: 'var(--radius-md)', marginBottom: '28px', border: '1px solid var(--border-subtle)' }}>
                <div className="creator-avatar-mini" style={{ width: '36px', height: '36px' }}>
                  {creators.find(c => c.id === viewingMaterial.creator_id).name[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Shared by: {creators.find(c => c.id === viewingMaterial.creator_id).name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{creators.find(c => c.id === viewingMaterial.creator_id).platform} {creators.find(c => c.id === viewingMaterial.creator_id).handle}</div>
                </div>
                {creators.find(c => c.id === viewingMaterial.creator_id).profile_url && (
                  <a href={creators.find(c => c.id === viewingMaterial.creator_id).profile_url} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                    Visit Page
                  </a>
                )}
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <a 
                href={viewingMaterial.url} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-primary" 
                style={{ flex: 1 }}
              >
                Open Study Material
                <ExternalLink size={16} />
              </a>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => copyToClipboard(viewingMaterial.url)}
              >
                <Copy size={16} />
                Copy Link
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                style={{ color: 'rgba(239, 68, 68, 0.8)' }}
                onClick={() => {
                  setViewingMaterial(null)
                  handleDeleteMaterial(viewingMaterial.id)
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL: ADD SUBJECT */}
      {showSubjectModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '400px' }}>
            <button className="modal-close" onClick={() => setShowSubjectModal(false)}>
              <X size={20} />
            </button>
            <h2 className="modal-title">New Subject Board</h2>
            <form onSubmit={handleSaveSubject}>
              <div className="form-group">
                <label className="form-label">Subject Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g., Operating Systems"
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label className="form-label">Board Accent Color</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
                  {subjectColorPresets.map(color => (
                    <button 
                      key={color}
                      type="button"
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: color,
                        border: newSubColor === color ? '2px solid white' : 'none',
                        cursor: 'pointer',
                        transform: newSubColor === color ? 'scale(1.15)' : 'none',
                        transition: 'transform 0.15s ease'
                      }}
                      onClick={() => setNewSubColor(color)}
                    />
                  ))}
                </div>
                <input 
                  type="color" 
                  className="form-input"
                  style={{ height: '42px', padding: '2px', cursor: 'pointer' }}
                  value={newSubColor}
                  onChange={(e) => setNewSubColor(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                Create Board
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD CREATOR */}
      {showCreatorModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '460px' }}>
            <button className="modal-close" onClick={() => setShowCreatorModal(false)}>
              <X size={20} />
            </button>
            <h2 className="modal-title">Add Content Creator</h2>
            <form onSubmit={handleSaveCreator}>
              <div className="form-group">
                <label className="form-label">Creator Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g., Love Babbar"
                  value={newCrName}
                  onChange={(e) => setNewCrName(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label className="form-label">Platform Source</label>
                <select 
                  className="form-select"
                  value={newCrPlatform}
                  onChange={(e) => setNewCrPlatform(e.target.value)}
                >
                  <option value="YouTube">YouTube</option>
                  <option value="Instagram">Instagram</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Medium">Medium</option>
                  <option value="Twitter/X">Twitter / X</option>
                  <option value="Telegram">Telegram</option>
                  <option value="Other">Other Platform</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Handle (Optional)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g., @striver_79"
                  value={newCrHandle}
                  onChange={(e) => setNewCrHandle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Profile Page URL (Optional)</label>
                <input 
                  type="url" 
                  className="form-input" 
                  placeholder="https://"
                  value={newCrProfileUrl}
                  onChange={(e) => setNewCrProfileUrl(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                Add Creator to Database
              </button>
            </form>
          </div>
        </div>
      )}
    
    </>
  );
}
