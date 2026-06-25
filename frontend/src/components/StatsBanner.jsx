import React from 'react';
import { BookOpen, Heart, CheckCircle2, FileText, Video, ExternalLink } from 'lucide-react';

// Inline Github Icon to avoid version export discrepancies in lucide-react
function Github({ size = 16, className = "" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function StatsBanner({ 
  user, 
  dashboardStats, 
  recentMaterials, 
  subjects, 
  setActiveTab, 
  completionPercentage,
  materials = [],
  todos = [],
  monthlyTargets = [],
  handleCreateTodo,
  handleToggleTodo,
  handleDeleteTodo,
  handleCreateMonthlyTarget,
  handleToggleMonthlyTarget,
  handleDeleteMonthlyTarget
}) {
  const [progressType, setProgressType] = React.useState('todo');
  const [newTodoText, setNewTodoText] = React.useState('');
  const [newTargetText, setNewTargetText] = React.useState('');

  // Calculate To-Do Progress
  const completedTodos = todos.filter(t => t.is_completed).length;
  const totalTodos = todos.length;
  const todoPercentage = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  // Calculate Monthly Target Progress
  const completedMonthlyTargets = monthlyTargets.filter(t => t.is_completed).length;
  const totalMonthlyTargets = monthlyTargets.length;
  const monthlyPercentage = totalMonthlyTargets > 0 ? Math.round((completedMonthlyTargets / totalMonthlyTargets) * 100) : 0;

  // Selected progress stats for the radial card
  const percentage = progressType === 'todo' ? todoPercentage : monthlyPercentage;
  const radialLabel = progressType === 'todo' ? 'Done' : 'Target';
  const radialColor = progressType === 'todo' ? 'var(--success)' : 'var(--accent-purple)';
  const radialDesc = progressType === 'todo'
    ? `You completed ${completedTodos} out of ${totalTodos} study tasks. Keep going!`
    : `You completed ${completedMonthlyTargets} out of ${totalMonthlyTargets} monthly targets for this month.`;

  return (
    <>

              <div className="view-header">
                <div>
                  <h1 className="page-title text-gradient">Dashboard</h1>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                    Welcome back, {user?.firstName || 'Student'}! Let's conquer some notes today.
                  </p>
                </div>
              </div>

              {/* Stats row */}
              <div className="dashboard-grid">
                <div className="glass-card stat-card">
                  <div className="stat-icon purple">
                    <BookOpen />
                  </div>
                  <div>
                    <div className="stat-label">Total Materials</div>
                    <div className="stat-value">{dashboardStats.total}</div>
                  </div>
                </div>
                <div className="glass-card stat-card">
                  <div className="stat-icon orange">
                    <Heart />
                  </div>
                  <div>
                    <div className="stat-label">Starred Materials</div>
                    <div className="stat-value">{dashboardStats.favorites}</div>
                  </div>
                </div>
                <div className="glass-card stat-card">
                  <div className="stat-icon teal">
                    <CheckCircle2 />
                  </div>
                  <div>
                    <div className="stat-label">Read / Completed</div>
                    <div className="stat-value">{dashboardStats.completed}</div>
                  </div>
                </div>
                <div className="glass-card stat-card">
                  <div className="stat-icon blue">
                    <FileText />
                  </div>
                  <div>
                    <div className="stat-label">Uploaded Documents</div>
                    <div className="stat-value">{dashboardStats.files}</div>
                  </div>
                </div>
              </div>

              {/* Analytics Rows */}
              <div className="analytics-section">
                
                {/* Left side: subject distribution + recent materials */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  
                  {/* Subject distribution */}
                  <div className="glass-card">
                    <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1.2rem', marginBottom: '20px' }}>Subjects Distribution</h3>
                    {dashboardStats.subjectsDistribution.length === 0 ? (
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>No categorized subjects yet. Create subjects to group your files!</p>
                    ) : (
                      <div style={{ 
                        position: 'relative', 
                        height: '180px', 
                        marginTop: '15px',
                        marginLeft: '35px', 
                        marginBottom: '35px', 
                        borderLeft: '1px solid var(--border-subtle)',
                        borderBottom: '1px solid var(--border-subtle)'
                      }}>
                        {/* Y-Axis Grid Lines and Labels */}
                        {[100, 75, 50, 25, 0].map((val) => (
                          <div key={val} style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: `${val}%`,
                            height: '1px',
                            pointerEvents: 'none'
                          }}>
                            <span style={{
                              position: 'absolute',
                              right: 'calc(100% + 8px)',
                              top: '-7px',
                              fontSize: '0.7rem',
                              color: 'var(--text-muted)',
                              textAlign: 'right',
                              width: '30px',
                              fontWeight: 600
                            }}>
                              {val}%
                            </span>
                            {val > 0 && (
                              <div style={{
                                marginLeft: '0',
                                height: '1px',
                                borderTop: '1px dashed rgba(255, 255, 255, 0.05)'
                              }}></div>
                            )}
                          </div>
                        ))}

                        {/* Bars Container */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-around',
                          alignItems: 'flex-end',
                          height: '100%',
                          width: '100%',
                          padding: '0 10px',
                          position: 'relative',
                          zIndex: 1
                        }}>
                          {dashboardStats.subjectsDistribution.map(s => {
                            const barHeight = s.percentage;
                            return (
                              <div key={s.id} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                flex: 1,
                                height: '100%',
                                justifyContent: 'flex-end',
                                margin: '0 6px',
                                position: 'relative'
                              }}
                              className="bar-group"
                              >
                                {/* Tooltip on hover */}
                                <div style={{
                                  position: 'absolute',
                                  bottom: `calc(${barHeight}% + 10px)`,
                                  backgroundColor: 'var(--bg-card)',
                                  border: '1px solid var(--border-subtle)',
                                  padding: '6px 10px',
                                  borderRadius: 'var(--radius-sm)',
                                  fontSize: '0.75rem',
                                  color: 'var(--text-primary)',
                                  pointerEvents: 'none',
                                  opacity: 0,
                                  transition: 'opacity 0.2s ease, transform 0.2s ease',
                                  transform: 'translateY(5px)',
                                  whiteSpace: 'nowrap',
                                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                                  zIndex: 10
                                }}
                                className="bar-tooltip"
                                >
                                  <strong style={{ color: s.color }}>{s.name}</strong>: {s.count} {s.count === 1 ? 'material' : 'materials'} ({s.percentage}%)
                                </div>

                                {/* Vertical Bar */}
                                <div style={{
                                  height: `${barHeight}%`,
                                  width: '100%',
                                  maxWidth: '32px',
                                  minHeight: '4px',
                                  background: `linear-gradient(to top, ${s.color}22, ${s.color})`,
                                  border: `1px solid ${s.color}66`,
                                  borderRadius: '4px 4px 0 0',
                                  position: 'relative',
                                  cursor: 'pointer',
                                  transition: 'all 0.25s ease',
                                  boxShadow: `0 0 8px ${s.color}10`
                                }}
                                onMouseEnter={(e) => {
                                  const parent = e.currentTarget.parentElement;
                                  const tooltip = parent ? parent.querySelector('.bar-tooltip') : null;
                                  if (tooltip) {
                                    tooltip.style.opacity = '1';
                                    tooltip.style.transform = 'translateY(0)';
                                  }
                                  e.currentTarget.style.filter = 'brightness(1.2)';
                                  e.currentTarget.style.boxShadow = `0 0 16px ${s.color}44`;
                                  e.currentTarget.style.transform = 'scaleX(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                  const parent = e.currentTarget.parentElement;
                                  const tooltip = parent ? parent.querySelector('.bar-tooltip') : null;
                                  if (tooltip) {
                                    tooltip.style.opacity = '0';
                                    tooltip.style.transform = 'translateY(5px)';
                                  }
                                  e.currentTarget.style.filter = 'none';
                                  e.currentTarget.style.boxShadow = `0 0 8px ${s.color}10`;
                                  e.currentTarget.style.transform = 'none';
                                }}
                                >
                                  {/* Small number inside/above the bar if enough space */}
                                  {barHeight > 15 && (
                                    <span style={{
                                      position: 'absolute',
                                      top: '6px',
                                      left: '50%',
                                      transform: 'translateX(-50%)',
                                      fontSize: '0.7rem',
                                      fontWeight: 700,
                                      color: '#fff',
                                      textShadow: '0 1px 2px rgba(0,0,0,0.6)'
                                    }}>
                                      {s.count}
                                    </span>
                                  )}
                                </div>

                                {/* X-Axis Label */}
                                <div style={{
                                  position: 'absolute',
                                  top: '100%',
                                  marginTop: '8px',
                                  textAlign: 'center',
                                  width: '100%',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  gap: '2px'
                                }}>
                                  <span style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    color: 'var(--text-primary)',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    maxWidth: '65px',
                                    display: 'block'
                                  }} title={s.name}>
                                    {s.name}
                                  </span>
                                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                                    {s.percentage}%
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Recent items grid */}
                  <div className="glass-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1.2rem' }}>Recently Added Resources</h3>
                      <button className="btn-secondary btn" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => setActiveTab('materials')}>View All</button>
                    </div>
                    
                    {recentMaterials.length === 0 ? (
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>No study materials saved yet. Paste a link or upload a file above!</p>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {recentMaterials.map(m => {
                          const sub = subjects.find(s => s.id === m.subject_id)
                          return (
                            <div key={m.id} style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'space-between', 
                              padding: '12px', 
                              backgroundColor: 'rgba(255,255,255,0.02)',
                              border: '1px solid var(--border-subtle)',
                              borderRadius: 'var(--radius-md)',
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
                                <div style={{ 
                                  width: '36px', 
                                  height: '36px', 
                                  borderRadius: '8px', 
                                  backgroundColor: sub ? `${sub.color}15` : 'rgba(255,255,255,0.05)',
                                  color: sub ? sub.color : 'var(--text-secondary)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  {m.type === 'youtube' ? <Video size={16} /> : m.type === 'github' ? <Github size={16} /> : <FileText size={16} />}
                                </div>
                                <div style={{ minWidth: 0, flex: 1 }}>
                                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.title}</h4>
                                  <div style={{ display: 'flex', gap: '8px', marginTop: '2px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    <span>{new Date(m.created_at).toLocaleDateString()}</span>
                                    {sub && <span>• <span style={{ color: sub.color }}>{sub.name}</span></span>}
                                  </div>
                                </div>
                              </div>
                              <a href={m.url} target="_blank" rel="noreferrer" className="btn-icon" style={{ color: 'var(--text-secondary)' }}>
                                <ExternalLink size={16} />
                              </a>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side: Progress, To-Dos, and Monthly Target */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  
                  {/* Radial progress card */}
                  <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '20px' }}>
                      <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1.2rem', margin: 0 }}>Progress</h3>
                      <select 
                        value={progressType} 
                        onChange={(e) => setProgressType(e.target.value)}
                        style={{
                          background: 'var(--bg-search)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-primary)',
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.8rem',
                          outline: 'none',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontFamily: 'var(--font-body)'
                        }}
                      >
                        <option value="todo">Task Progress</option>
                        <option value="monthly">Monthly Progress</option>
                      </select>
                    </div>
                    
                    <div style={{ position: 'relative', width: '130px', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                      {/* Simple SVG Circular progress bar */}
                      <svg style={{ transform: 'rotate(-90deg)', width: '130px', height: '130px' }}>
                        <circle cx="65" cy="65" r="55" stroke="rgba(255,255,255,0.03)" strokeWidth="10" fill="transparent" />
                        <circle 
                          cx="65" 
                          cy="65" 
                          r="55" 
                          stroke={radialColor} 
                          strokeWidth="10" 
                          fill="transparent" 
                          strokeDasharray={345}
                          strokeDashoffset={345 - (345 * percentage) / 100}
                          strokeLinecap="round"
                          style={{ transition: 'stroke-dashoffset 0.8s ease, stroke 0.3s ease' }}
                        />
                      </svg>
                      <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span style={{ fontSize: '1.8rem', fontWeight: 700, fontFamily: 'var(--font-header)' }}>{percentage}%</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{radialLabel}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {radialDesc}
                    </p>
                  </div>

                  {/* To-Do List Card */}
                  <div className="glass-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--accent-purple)' }}>✓</span> Study Tasks
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        {todos.filter(t => t.is_completed).length}/{todos.length} completed
                      </span>
                    </div>

                    {/* Progress bar */}
                    {todos.length > 0 && (
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ height: '6px', width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ 
                            height: '100%', 
                            width: `${(todos.filter(t => t.is_completed).length / todos.length) * 100}%`, 
                            backgroundColor: 'var(--success)', 
                            borderRadius: '3px', 
                            transition: 'width 0.3s ease' 
                          }}></div>
                        </div>
                      </div>
                    )}

                    {/* Tasks list */}
                    {todos.length === 0 ? (
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>
                        No pending tasks. Add a study task below (e.g., "Read OS notes")!
                      </p>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', maxHeight: '200px', overflowY: 'auto', paddingRight: '4px' }}>
                        {todos.map(todo => (
                          <div key={todo.id} style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between', 
                            padding: '10px 12px', 
                            backgroundColor: todo.is_completed ? 'rgba(16, 185, 129, 0.03)' : 'rgba(255,255,255,0.01)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-sm)',
                            transition: 'all 0.2s ease'
                          }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, cursor: 'pointer', minWidth: 0 }}>
                              <input 
                                type="checkbox" 
                                checked={todo.is_completed}
                                onChange={(e) => handleToggleTodo(todo.id, e.target.checked)}
                                style={{ 
                                  width: '15px', 
                                  height: '15px', 
                                  accentColor: 'var(--accent-purple)', 
                                  cursor: 'pointer' 
                                }}
                              />
                              <span style={{ 
                                fontSize: '0.85rem', 
                                color: todo.is_completed ? 'var(--text-muted)' : 'var(--text-primary)',
                                textDecoration: todo.is_completed ? 'line-through' : 'none',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}>
                                {todo.text}
                              </span>
                            </label>
                            <button 
                              className="action-btn-mini"
                              style={{ color: 'rgba(239,68,68,0.5)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
                              onClick={() => handleDeleteTodo(todo.id)}
                              title="Delete Task"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6m4-6v6"/>
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add task form */}
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      if (newTodoText.trim()) {
                        handleCreateTodo(newTodoText);
                        setNewTodoText('');
                      }
                    }} style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="New study task..." 
                        value={newTodoText}
                        onChange={(e) => setNewTodoText(e.target.value)}
                        style={{ margin: 0, padding: '6px 12px', fontSize: '0.85rem', flex: 1 }}
                        required
                      />
                      <button type="submit" className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
                        Add
                      </button>
                    </form>
                  </div>

                  {/* Monthly Target Card */}
                  <div className="glass-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--accent-purple)' }}>🎯</span> {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })} Targets
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        {completedMonthlyTargets}/{totalMonthlyTargets} completed
                      </span>
                    </div>

                    {/* Progress bar */}
                    {totalMonthlyTargets > 0 && (
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ height: '6px', width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ 
                            height: '100%', 
                            width: `${monthlyPercentage}%`, 
                            background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-blue))',
                            borderRadius: '3px', 
                            transition: 'width 0.3s ease' 
                          }}></div>
                        </div>
                      </div>
                    )}

                    {/* Targets list */}
                    {monthlyTargets.length === 0 ? (
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>
                        No goals set for this month. Add a monthly target below (e.g., "Complete OS notes")!
                      </p>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', maxHeight: '200px', overflowY: 'auto', paddingRight: '4px' }}>
                        {monthlyTargets.map(target => (
                          <div key={target.id} style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between', 
                            padding: '10px 12px', 
                            backgroundColor: target.is_completed ? 'rgba(124, 58, 237, 0.03)' : 'rgba(255,255,255,0.01)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-sm)',
                            transition: 'all 0.2s ease'
                          }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, cursor: 'pointer', minWidth: 0 }}>
                              <input 
                                type="checkbox" 
                                checked={target.is_completed}
                                onChange={(e) => handleToggleMonthlyTarget(target.id, e.target.checked)}
                                style={{ 
                                  width: '15px', 
                                  height: '15px', 
                                  accentColor: 'var(--accent-purple)', 
                                  cursor: 'pointer' 
                                }}
                              />
                              <span style={{ 
                                fontSize: '0.85rem', 
                                color: target.is_completed ? 'var(--text-muted)' : 'var(--text-primary)',
                                textDecoration: target.is_completed ? 'line-through' : 'none',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}>
                                {target.text}
                              </span>
                            </label>
                            <button 
                              className="action-btn-mini"
                              style={{ color: 'rgba(239,68,68,0.5)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
                              onClick={() => handleDeleteMonthlyTarget(target.id)}
                              title="Delete Target"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6m4-6v6"/>
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add target form */}
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      if (newTargetText.trim()) {
                        handleCreateMonthlyTarget(newTargetText);
                        setNewTargetText('');
                      }
                    }} style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="New monthly goal..." 
                        value={newTargetText}
                        onChange={(e) => setNewTargetText(e.target.value)}
                        style={{ margin: 0, padding: '6px 12px', fontSize: '0.85rem', flex: 1 }}
                        required
                      />
                      <button type="submit" className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
                        Add
                      </button>
                    </form>
                  </div>
                </div>
              </div>
    </>
  );
}
