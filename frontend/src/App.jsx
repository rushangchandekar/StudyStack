import { useState, useEffect, useMemo } from 'react'
import { 
  useAuth, 
  useUser
} from '@clerk/clerk-react'
import { 
  BookOpen, 
  Link as LinkIcon, 
  FileText, 
  Video,  
  Search, 
  Filter, 
  User, 
  ArrowRight,
  Globe,
} from 'lucide-react'
import { api } from './api'
import LandingPage from './pages/LandingPage'
import SignInPage from './pages/SignInPage'
import DashboardPage from './pages/DashboardPage'

export default function App({ isMockMode }) {
  // Clerk Authentication
  const { isLoaded, isSignedIn, getToken } = isMockMode 
    ? { isLoaded: true, isSignedIn: true, getToken: () => Promise.resolve('mock-user-token') } 
    : useAuth()
  const { user } = isMockMode 
    ? { user: { firstName: 'Rushang', lastName: 'Student', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60' } } 
    : useUser()

  // App Navigation & UI States
  const [activeTab, setActiveTab] = useState('dashboard')
  const [view, setView] = useState('landing')
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [subjectFilter, setSubjectFilter] = useState('all')
  const [creatorFilter, setCreatorFilter] = useState('all')
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('ss-theme') === 'dark' || false)
  
  // Data State
  const [materials, setMaterials] = useState([])
  const [subjects, setSubjects] = useState([])
  const [creators, setCreators] = useState([])
  const [todos, setTodos] = useState([])
  const [monthlyTargets, setMonthlyTargets] = useState([])
  
  // App System Status
  const [dbStatus, setDbStatus] = useState('connecting')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingMaterial, setEditingMaterial] = useState(null)
  const [viewingMaterial, setViewingMaterial] = useState(null)
  const [showSubjectModal, setShowSubjectModal] = useState(false)
  const [showCreatorModal, setShowCreatorModal] = useState(false)

  // Form States - Material
  const [matTitle, setMatTitle] = useState('')
  const [matType, setMatType] = useState('google_drive')
  const [matUrl, setMatUrl] = useState('')
  const [matDesc, setMatDesc] = useState('')
  const [matSubjectId, setMatSubjectId] = useState('')
  const [matCreatorId, setMatCreatorId] = useState('')
  const [matTags, setMatTags] = useState('')
  const [matNotes, setMatNotes] = useState('')
  const [uploadProgress, setUploadProgress] = useState(-1)
  const [uploadedFileUrl, setUploadedFileUrl] = useState('')

  // Form States - Subject & Creator
  const [newSubName, setNewSubName] = useState('')
  const [newSubColor, setNewSubColor] = useState('#8B5CF6')
  const [newCrName, setNewCrName] = useState('')
  const [newCrPlatform, setNewCrPlatform] = useState('YouTube')
  const [newCrHandle, setNewCrHandle] = useState('')
  const [newCrProfileUrl, setNewCrProfileUrl] = useState('')

  // Presets colors for subjects
  const subjectColorPresets = [
    '#8B5CF6', // Purple
    '#3B82F6', // Blue
    '#10B981', // Teal/Green
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#EC4899', // Pink
    '#06B6D4', // Cyan
    '#F97316'  // Orange
  ]

  // Neutralize Clerk dev-mode stripe banner via DOM (inline styles can't be CSS-overridden)
  useEffect(() => {
    const neutralizeStripes = () => {
      document.querySelectorAll('div[style]').forEach(el => {
        if (el.dataset.clerkFixed) return // Already processed
        const style = el.getAttribute('style') || ''
        if (style.includes('repeating-linear-gradient')) {
          el.dataset.clerkFixed = 'true'
          el.setAttribute('style', 
            'background: #fffbeb !important; ' +
            'background-image: none !important; ' +
            'border: 1px solid rgba(245, 158, 11, 0.25) !important; ' +
            'border-radius: 8px !important; ' + 
            'padding: 8px 12px; ' +
            'color: #b45309 !important;'
          )
        }
      })
    }

    // Run immediately then watch for changes
    neutralizeStripes()

    const observer = new MutationObserver(() => neutralizeStripes())
    observer.observe(document.body, { 
      childList: true, 
      subtree: true, 
      attributes: true, 
      attributeFilter: ['style'] 
    })

    return () => observer.disconnect()
  }, [isSignedIn])

  const loadData = async () => {
    try {
      setDbStatus('connecting')
      const token = await getToken()
      
      const activeMonth = new Date().toISOString().substring(0, 7)
      const [materialsData, subjectsData, creatorsData, todosData, targetsData] = await Promise.all([
        api.getMaterials(token),
        api.getSubjects(token),
        api.getCreators(token),
        api.getTodos(token),
        api.getMonthlyTargets(token, activeMonth)
      ])
      
      setMaterials(materialsData)
      setSubjects(subjectsData)
      setCreators(creatorsData)
      setTodos(todosData)
      setMonthlyTargets(targetsData)
      setDbStatus(isMockMode ? 'local_db' : 'cloud_db')
      setErrorMsg('')
    } catch (err) {
      console.warn('Backend server connection failed. Falling back to local browser storage.', err)
      setDbStatus('offline')
      
      // Fallback Load from Browser Local Storage
      const storedMaterials = localStorage.getItem('studystack_materials')
      const storedSubjects = localStorage.getItem('studystack_subjects')
      const storedCreators = localStorage.getItem('studystack_creators')
      const storedTodos = localStorage.getItem('studystack_todos')
      const storedTargets = localStorage.getItem(`studystack_targets_${new Date().toISOString().substring(0, 7)}`)
      
      if (storedMaterials && storedSubjects && storedCreators) {
        setMaterials(JSON.parse(storedMaterials))
        setSubjects(JSON.parse(storedSubjects))
        setCreators(JSON.parse(storedCreators))
        setTodos(storedTodos ? JSON.parse(storedTodos) : [])
        setMonthlyTargets(storedTargets ? JSON.parse(storedTargets) : [])
      } else {
        // Seed default template data for premium first look
        const seedSubjects = [
          {id: "s1", name: "Computer Science", color: "#8B5CF6", created_at: new Date().toISOString()},
          {id: "s2", name: "Mathematics", color: "#3B82F6", created_at: new Date().toISOString()},
          {id: "s3", name: "Placement Preparation", color: "#F59E0B", created_at: new Date().toISOString()},
          {id: "s4", name: "Web Engineering", color: "#10B981", created_at: new Date().toISOString()}
        ]
        const seedCreators = [
          {id: "c1", name: "Love Babbar", platform: "YouTube", handle: "@lovebabbar", profile_url: "https://youtube.com/@lovebabbar"},
          {id: "c2", name: "Striver (takeUforward)", platform: "YouTube", handle: "@takeUforward", profile_url: "https://youtube.com/@takeuforward"},
          {id: "c3", name: "Tech Creators", platform: "Instagram", handle: "@tech_creators", profile_url: "https://instagram.com"}
        ]
        const seedMaterials = [
          {
            id: "m1", 
            title: "Cracking the Coding Interview Sheet", 
            type: "google_drive", 
            url: "https://drive.google.com/drive/folders/1_seed_drive_folder", 
            description: "Curated folders containing solved placement prep questions, tricks, guides, and resume review templates.",
            subject_id: "s3", 
            creator_id: "c1", 
            is_favorite: true, 
            is_read: false, 
            tags: ["Placement", "DSA", "Resume"], 
            notes: "Complete Arrays and Strings first.", 
            created_at: new Date().toISOString()
          },
          {
            id: "m2", 
            title: "Database System Cheat Sheet", 
            type: "pdf", 
            url: "https://example.com/dbms.pdf", 
            description: "One-page PDF covering SQL operations, joins, transaction properties, ACID principles, and indexes.",
            subject_id: "s1", 
            creator_id: "c2", 
            is_favorite: false, 
            is_read: true, 
            tags: ["DBMS", "SQL", "Exam Prep"], 
            notes: "Excellent for quick revision 1 hour before exams.", 
            created_at: new Date().toISOString()
          },
          {
            id: "m3", 
            title: "CSS Custom Properties Guide", 
            type: "website", 
            url: "https://web.dev", 
            description: "Interactive tutorial and reference on how to structure design tokens using Vanilla CSS custom variables.",
            subject_id: "s4", 
            creator_id: "c3", 
            is_favorite: true, 
            is_read: false, 
            tags: ["CSS", "Frontend", "UI Design"], 
            notes: "Covers nesting variables and HSL palettes.", 
            created_at: new Date().toISOString()
          }
        ]
        
        setSubjects(seedSubjects)
        setCreators(seedCreators)
        setMaterials(seedMaterials)
        setTodos([])
        setMonthlyTargets([])
        
        localStorage.setItem('studystack_materials', JSON.stringify(seedMaterials))
        localStorage.setItem('studystack_subjects', JSON.stringify(seedSubjects))
        localStorage.setItem('studystack_creators', JSON.stringify(seedCreators))
        localStorage.setItem('studystack_todos', JSON.stringify([]))
        localStorage.setItem(`studystack_targets_${new Date().toISOString().substring(0, 7)}`, JSON.stringify([]))
      }
    }
  }

  useEffect(() => {
    if (isSignedIn) {
      loadData()
    }
  }, [isSignedIn])

  useEffect(() => {
    if (!isMockMode && isLoaded && isSignedIn && view === 'signin') {
      setView('dashboard')
    }
  }, [isSignedIn, isLoaded, isMockMode, view])

  // Handle redirect query param from Clerk login to go directly to dashboard
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('login') === 'success') {
      setView('dashboard')
      // Clean up the URL query parameter so the address bar looks pristine
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode')
      localStorage.setItem('ss-theme', 'dark')
    } else {
      document.body.classList.remove('dark-mode')
      localStorage.setItem('ss-theme', 'light')
    }
  }, [isDarkMode])

  // Save changes locally in offline mode
  const persistOfflineData = (updatedMat, updatedSub, updatedCr, updatedTodos, updatedTargets) => {
    if (dbStatus === 'offline') {
      if (updatedMat) localStorage.setItem('studystack_materials', JSON.stringify(updatedMat))
      if (updatedSub) localStorage.setItem('studystack_subjects', JSON.stringify(updatedSub))
      if (updatedCr) localStorage.setItem('studystack_creators', JSON.stringify(updatedCr))
      if (updatedTodos) localStorage.setItem('studystack_todos', JSON.stringify(updatedTodos))
      if (updatedTargets) localStorage.setItem(`studystack_targets_${new Date().toISOString().substring(0, 7)}`, JSON.stringify(updatedTargets))
    }
  }

  // --- To-Do Event Handlers ---
  const handleCreateTodo = async (text) => {
    if (!text.trim()) return
    try {
      const token = await getToken()
      let newTodo
      if (dbStatus === 'offline') {
        newTodo = {
          id: `t_${Date.now()}`,
          user_id: 'mock-user-123',
          text,
          is_completed: false,
          created_at: new Date().toISOString()
        }
        const updated = [...todos, newTodo]
        setTodos(updated)
        persistOfflineData(null, null, null, updated, null)
      } else {
        newTodo = await api.createTodo(token, text)
        setTodos([...todos, newTodo])
      }
      showNotification('Task added!')
    } catch (err) {
      setErrorMsg(`Failed to add task: ${err.message}`)
      setTimeout(() => setErrorMsg(''), 4000)
    }
  }

  const handleToggleTodo = async (id, is_completed) => {
    try {
      const token = await getToken()
      if (dbStatus === 'offline') {
        const updated = todos.map(t => t.id === id ? { ...t, is_completed } : t)
        setTodos(updated)
        persistOfflineData(null, null, null, updated, null)
      } else {
        const updatedTodo = await api.updateTodo(token, id, is_completed)
        setTodos(todos.map(t => t.id === id ? updatedTodo : t))
      }
    } catch (err) {
      setErrorMsg(`Failed to update task: ${err.message}`)
      setTimeout(() => setErrorMsg(''), 4000)
    }
  }

  const handleDeleteTodo = async (id) => {
    try {
      const token = await getToken()
      if (dbStatus === 'offline') {
        const updated = todos.filter(t => t.id !== id)
        setTodos(updated)
        persistOfflineData(null, null, null, updated, null)
      } else {
        await api.deleteTodo(token, id)
        setTodos(todos.filter(t => t.id !== id))
      }
      showNotification('Task deleted')
    } catch (err) {
      setErrorMsg(`Failed to delete task: ${err.message}`)
      setTimeout(() => setErrorMsg(''), 4000)
    }
  }

  // --- Monthly Target Event Handlers ---
  const handleCreateMonthlyTarget = async (text) => {
    if (!text.trim()) return
    const activeMonth = new Date().toISOString().substring(0, 7)
    try {
      const token = await getToken()
      let newTarget
      if (dbStatus === 'offline') {
        newTarget = {
          id: `tg_${Date.now()}`,
          user_id: 'mock-user-123',
          month: activeMonth,
          text,
          is_completed: false,
          created_at: new Date().toISOString()
        }
        const updated = [...monthlyTargets, newTarget]
        setMonthlyTargets(updated)
        persistOfflineData(null, null, null, null, updated)
      } else {
        newTarget = await api.createMonthlyTarget(token, activeMonth, text)
        setMonthlyTargets([...monthlyTargets, newTarget])
      }
      showNotification('Target added!')
    } catch (err) {
      setErrorMsg(`Failed to add target: ${err.message}`)
      setTimeout(() => setErrorMsg(''), 4000)
    }
  }

  const handleToggleMonthlyTarget = async (id, is_completed) => {
    try {
      const token = await getToken()
      if (dbStatus === 'offline') {
        const updated = monthlyTargets.map(t => t.id === id ? { ...t, is_completed } : t)
        setMonthlyTargets(updated)
        persistOfflineData(null, null, null, null, updated)
      } else {
        const updatedTarget = await api.updateMonthlyTarget(token, id, is_completed)
        setMonthlyTargets(monthlyTargets.map(t => t.id === id ? updatedTarget : t))
      }
    } catch (err) {
      setErrorMsg(`Failed to update target: ${err.message}`)
      setTimeout(() => setErrorMsg(''), 4000)
    }
  }

  const handleDeleteMonthlyTarget = async (id) => {
    try {
      const token = await getToken()
      if (dbStatus === 'offline') {
        const updated = monthlyTargets.filter(t => t.id !== id)
        setMonthlyTargets(updated)
        persistOfflineData(null, null, null, null, updated)
      } else {
        await api.deleteMonthlyTarget(token, id)
        setMonthlyTargets(monthlyTargets.filter(t => t.id !== id))
      }
      showNotification('Target deleted')
    } catch (err) {
      setErrorMsg(`Failed to delete target: ${err.message}`)
      setTimeout(() => setErrorMsg(''), 4000)
    }
  }

  // --- Dynamic Link URL Parser ---
  const handleUrlBlur = (url) => {
    if (!url || matTitle) return // don't overwrite user's custom title
    
    // Auto-detect type and fill title based on popular links
    if (url.includes('drive.google.com')) {
      setMatType('google_drive')
      setMatTitle('Google Drive Resource')
    } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
      setMatType('youtube')
      setMatTitle('YouTube Video Lesson')
    } else if (url.includes('github.com')) {
      setMatType('github')
      setMatTitle('GitHub Repository')
    } else if (url.endsWith('.pdf')) {
      setMatType('pdf')
      setMatTitle('PDF Document')
    } else if (url.endsWith('.docx') || url.endsWith('.doc')) {
      setMatType('docx')
      setMatTitle('Word Document')
    } else if (url.startsWith('http')) {
      setMatType('website')
      // Try to parse clean domain name as fallback title
      try {
        const hostname = new URL(url).hostname.replace('www.', '')
        setMatTitle(`Study Reference (${hostname})`)
      } catch(e) {}
    }
  }

  // --- Mock/Real File Drag & Drop Upload Handler ---
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploadProgress(10)
    
    // Animate progress bar locally for high fidelity micro-interaction
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + 15
      })
    }, 150)

    try {
      const token = await getToken()
      let resultUrl = ''
      
      if (dbStatus === 'offline') {
        // Offline mock mode: generate object URL or local mock path
        await new Promise(resolve => setTimeout(resolve, 1500))
        resultUrl = `http://localhost:8000/uploads/${encodeURIComponent(file.name)}`
      } else {
        const uploadRes = await api.uploadFile(token, file)
        resultUrl = uploadRes.file_url
      }
      
      clearInterval(interval)
      setUploadProgress(100)
      setUploadedFileUrl(resultUrl)
      setMatUrl(resultUrl)
      if (!matTitle) {
        setMatTitle(file.name.split('.')[0])
      }
      
      // Auto-set type based on extension
      const ext = file.name.split('.').pop().toLowerCase()
      if (ext === 'pdf') setMatType('pdf')
      else if (['doc', 'docx'].includes(ext)) setMatType('docx')
      else setMatType('other')
      
      setTimeout(() => setUploadProgress(-1), 1000)
      showNotification('File uploaded successfully!')
    } catch (err) {
      clearInterval(interval)
      setUploadProgress(-1)
      setErrorMsg(`Upload failed: ${err.message}`)
      setTimeout(() => setErrorMsg(''), 4000)
    }
  }

  // --- CRUD Operations ---

  // Create/Update Material
  const handleSaveMaterial = async (e) => {
    e.preventDefault()
    if (!matTitle || !matUrl) {
      alert('Title and Link URL/File are required.')
      return
    }

    const payload = {
      title: matTitle,
      type: matType,
      url: matUrl,
      description: matDesc,
      subject_id: matSubjectId || null,
      creator_id: matCreatorId || null,
      tags: matTags.split(',').map(t => t.trim()).filter(Boolean),
      notes: matNotes
    }

    try {
      const token = await getToken()
      
      if (editingMaterial) {
        // UPDATE
        let updatedMatItem
        if (dbStatus === 'offline') {
          updatedMatItem = { ...editingMaterial, ...payload }
          const updated = materials.map(m => m.id === editingMaterial.id ? updatedMatItem : m)
          setMaterials(updated)
          persistOfflineData(updated, null, null)
        } else {
          updatedMatItem = await api.updateMaterial(token, editingMaterial.id, payload)
          setMaterials(materials.map(m => m.id === editingMaterial.id ? updatedMatItem : m))
        }
        showNotification('Material updated successfully!')
      } else {
        // CREATE
        let newMatItem
        if (dbStatus === 'offline') {
          newMatItem = { id: `m_${Date.now()}`, created_at: new Date().toISOString(), ...payload }
          const updated = [newMatItem, ...materials]
          setMaterials(updated)
          persistOfflineData(updated, null, null)
        } else {
          newMatItem = await api.createMaterial(token, payload)
          setMaterials([newMatItem, ...materials])
        }
        showNotification('New material cataloged!')
      }
      
      resetMaterialForm()
      setShowAddModal(false)
    } catch (err) {
      setErrorMsg(`Failed to save: ${err.message}`)
    }
  }

  const handleDeleteMaterial = async (id) => {
    if (!confirm('Are you sure you want to delete this study material?')) return
    try {
      const token = await getToken()
      if (dbStatus === 'offline') {
        const updated = materials.filter(m => m.id !== id)
        setMaterials(updated)
        persistOfflineData(updated, null, null)
      } else {
        await api.deleteMaterial(token, id)
        setMaterials(materials.filter(m => m.id !== id))
      }
      showNotification('Material removed.')
    } catch (err) {
      alert(`Error deleting: ${err.message}`)
    }
  }

  const handleToggleFavorite = async (item) => {
    const updatedFav = !item.is_favorite
    try {
      const token = await getToken()
      if (dbStatus === 'offline') {
        const updated = materials.map(m => m.id === item.id ? { ...m, is_favorite: updatedFav } : m)
        setMaterials(updated)
        persistOfflineData(updated, null, null)
      } else {
        await api.updateMaterial(token, item.id, { is_favorite: updatedFav })
        setMaterials(materials.map(m => m.id === item.id ? { ...m, is_favorite: updatedFav } : m))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleToggleRead = async (item) => {
    const updatedRead = !item.is_read
    try {
      const token = await getToken()
      if (dbStatus === 'offline') {
        const updated = materials.map(m => m.id === item.id ? { ...m, is_read: updatedRead } : m)
        setMaterials(updated)
        persistOfflineData(updated, null, null)
      } else {
        await api.updateMaterial(token, item.id, { is_read: updatedRead })
        setMaterials(materials.map(m => m.id === item.id ? { ...m, is_read: updatedRead } : m))
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Create Subject
  const handleSaveSubject = async (e) => {
    e.preventDefault()
    if (!newSubName.trim()) return
    
    try {
      const token = await getToken()
      let newSub
      if (dbStatus === 'offline') {
        newSub = { id: `s_${Date.now()}`, user_id: 'mock-user-123', name: newSubName, color: newSubColor, created_at: new Date().toISOString() }
        const updated = [...subjects, newSub]
        setSubjects(updated)
        persistOfflineData(null, updated, null)
      } else {
        newSub = await api.createSubject(token, { name: newSubName, color: newSubColor })
        setSubjects([...subjects, newSub])
      }
      
      setNewSubName('')
      setShowSubjectModal(false)
      showNotification(`Subject "${newSub.name}" created!`)
    } catch (err) {
      alert(`Error creating subject: ${err.message}`)
    }
  }

  const handleDeleteSubject = async (id) => {
    if (!confirm('Deleting this subject will uncategorize its materials. Proceed?')) return
    try {
      const token = await getToken()
      if (dbStatus === 'offline') {
        const updatedSubs = subjects.filter(s => s.id !== id)
        setSubjects(updatedSubs)
        const updatedMats = materials.map(m => m.subject_id === id ? { ...m, subject_id: null } : m)
        setMaterials(updatedMats)
        persistOfflineData(updatedMats, updatedSubs, null)
      } else {
        await api.deleteSubject(token, id)
        setSubjects(subjects.filter(s => s.id !== id))
        setMaterials(materials.map(m => m.subject_id === id ? { ...m, subject_id: null } : m))
      }
      showNotification('Subject deleted.')
    } catch (err) {
      alert(err.message)
    }
  }

  // Create Creator
  const handleSaveCreator = async (e) => {
    e.preventDefault()
    if (!newCrName.trim()) return

    const payload = {
      name: newCrName,
      platform: newCrPlatform,
      handle: newCrHandle || null,
      profile_url: newCrProfileUrl || null
    }

    try {
      const token = await getToken()
      let newCreator
      if (dbStatus === 'offline') {
        newCreator = { id: `c_${Date.now()}`, user_id: 'mock-user-123', created_at: new Date().toISOString(), ...payload }
        const updated = [...creators, newCreator]
        setCreators(updated)
        persistOfflineData(null, null, updated)
      } else {
        newCreator = await api.createCreator(token, payload)
        setCreators([...creators, newCreator])
      }

      setNewCrName('')
      setNewCrHandle('')
      setNewCrProfileUrl('')
      setShowCreatorModal(false)
      showNotification(`Creator "${newCreator.name}" added.`)
    } catch (err) {
      alert(`Error: ${err.message}`)
    }
  }

  const handleDeleteCreator = async (id) => {
    if (!confirm('Are you sure you want to remove this creator?')) return
    try {
      const token = await getToken()
      if (dbStatus === 'offline') {
        const updatedCrs = creators.filter(c => c.id !== id)
        setCreators(updatedCrs)
        const updatedMats = materials.map(m => m.creator_id === id ? { ...m, creator_id: null } : m)
        setMaterials(updatedMats)
        persistOfflineData(updatedMats, null, updatedCrs)
      } else {
        await api.deleteCreator(token, id)
        setCreators(creators.filter(c => c.id !== id))
        setMaterials(materials.map(m => m.creator_id === id ? { ...m, creator_id: null } : m))
      }
      showNotification('Creator deleted.')
    } catch (err) {
      alert(err.message)
    }
  }

  // --- Helper Helpers ---
  const resetMaterialForm = () => {
    setEditingMaterial(null)
    setMatTitle('')
    setMatType('google_drive')
    setMatUrl('')
    setMatDesc('')
    setMatSubjectId('')
    setMatCreatorId('')
    setMatTags('')
    setMatNotes('')
    setUploadedFileUrl('')
    setUploadProgress(-1)
  }

  const openEditMaterial = (item) => {
    setEditingMaterial(item)
    setMatTitle(item.title)
    setMatType(item.type)
    setMatUrl(item.url)
    setMatDesc(item.description || '')
    setMatSubjectId(item.subject_id || '')
    setMatCreatorId(item.creator_id || '')
    setMatTags(item.tags ? item.tags.join(', ') : '')
    setMatNotes(item.notes || '')
    setShowAddModal(true)
  }

  const showNotification = (msg) => {
    setSuccessMsg(msg)
    setTimeout(() => setSuccessMsg(''), 3500)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    showNotification('Link copied to clipboard!')
  }

  // --- Type badge and icons renderer ---
  const getTypeBadge = (type) => {
    const classMap = {
      google_drive: { label: 'Drive Link', css: 'badge-google-drive', icon: <BookOpen size={12} /> },
      website: { label: 'Website', css: 'badge-website', icon: <Globe size={12} /> },
      pdf: { label: 'PDF', css: 'badge-pdf', icon: <FileText size={12} /> },
      docx: { label: 'Word/Doc', css: 'badge-docx', icon: <FileText size={12} /> },
      youtube: { label: 'YouTube', css: 'badge-youtube', icon: <Video size={12} /> },
      github: { label: 'GitHub', css: 'badge-github', icon: <Github size={12} /> },
      other: { label: 'Reference', css: 'badge-other', icon: <LinkIcon size={12} /> }
    }
    const badge = classMap[type] || classMap['other']
    return (
      <span className={`card-type-badge ${badge.css}`}>
        {badge.icon}
        {badge.label}
      </span>
    )
  }

  // --- Filter and Search calculations ---
  const filteredMaterials = useMemo(() => {
    return materials.filter(m => {
      if (!m) return false
      // 1. Search Query Match
      const searchLower = searchQuery.toLowerCase()
      
      const titleText = m.title ? String(m.title).toLowerCase() : ''
      const descText = m.description ? String(m.description).toLowerCase() : ''
      const notesText = m.notes ? String(m.notes).toLowerCase() : ''
      
      const matchesSearch = 
        titleText.includes(searchLower) ||
        descText.includes(searchLower) ||
        notesText.includes(searchLower) ||
        (m.tags && Array.isArray(m.tags) && m.tags.some(t => t && String(t).toLowerCase().includes(searchLower)))

      // 2. Format filter Match
      const matchesType = typeFilter === 'all' || m.type === typeFilter

      // 3. Subject filter Match
      const matchesSubject = subjectFilter === 'all' || m.subject_id === subjectFilter

      // 4. Creator filter Match
      const matchesCreator = creatorFilter === 'all' || m.creator_id === creatorFilter

      // 5. Favorites Filter
      const matchesFav = !favoritesOnly || m.is_favorite

      return matchesSearch && matchesType && matchesSubject && matchesCreator && matchesFav
    })
  }, [materials, searchQuery, typeFilter, subjectFilter, creatorFilter, favoritesOnly])

  // --- Analytics Dashboard Calculations ---
  const dashboardStats = useMemo(() => {
    const total = materials.length
    const favorites = materials.filter(m => m.is_favorite).length
    const completed = materials.filter(m => m.is_read).length
    const files = materials.filter(m => ['pdf', 'docx'].includes(m.type)).length
    
    // Subject distribution percentages
    const subCounts = {}
    materials.forEach(m => {
      if (m.subject_id) {
        subCounts[m.subject_id] = (subCounts[m.subject_id] || 0) + 1
      }
    })

    const subjectsDistribution = subjects.map(s => {
      const count = subCounts[s.id] || 0
      return {
        ...s,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0
      }
    }).sort((a,b) => b.count - a.count)

    // Creator resource breakdown
    const crCounts = {}
    materials.forEach(m => {
      if (m.creator_id) {
        crCounts[m.creator_id] = (crCounts[m.creator_id] || 0) + 1
      }
    })

    const topCreators = creators.map(c => ({
      ...c,
      count: crCounts[c.id] || 0
    })).sort((a,b) => b.count - a.count).slice(0, 3)

    return { total, favorites, completed, files, subjectsDistribution, topCreators }
  }, [materials, subjects, creators])

  const completionPercentage = useMemo(() => {
    if (dashboardStats.total === 0) return 0
    return Math.round((dashboardStats.completed / dashboardStats.total) * 100)
  }, [dashboardStats])

  const recentMaterials = useMemo(() => {
    return [...materials]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 3)
  }, [materials])

  // --- View-based Routing ---
  if (view === 'landing') {
    return (
      <LandingPage 
        isMockMode={isMockMode} 
        isLoaded={isLoaded} 
        isSignedIn={isSignedIn} 
        setView={setView} 
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
    )
  }

  if (view === 'signin') {
    return (
      <SignInPage 
        isMockMode={isMockMode} 
        setView={setView} 
        loadData={loadData} 
      />
    )
  }

  // --- Render Desktop/Mobile Main Workspace ---

  return (
    <DashboardPage
      setView={setView}
      isDarkMode={isDarkMode}
      setIsDarkMode={setIsDarkMode}
      dbStatus={dbStatus}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isMockMode={isMockMode}
      user={user}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      resetMaterialForm={resetMaterialForm}
      setShowAddModal={setShowAddModal}
      successMsg={successMsg}
      dashboardStats={dashboardStats}
      recentMaterials={recentMaterials}
      subjects={subjects}
      completionPercentage={completionPercentage}
      typeFilter={typeFilter}
      setTypeFilter={setTypeFilter}
      subjectFilter={subjectFilter}
      setSubjectFilter={setSubjectFilter}
      creatorFilter={creatorFilter}
      setCreatorFilter={setCreatorFilter}
      favoritesOnly={favoritesOnly}
      setFavoritesOnly={setFavoritesOnly}
      filteredMaterials={filteredMaterials}
      creators={creators}
      getTypeBadge={getTypeBadge}
      handleToggleFavorite={handleToggleFavorite}
      openEditMaterial={openEditMaterial}
      handleDeleteMaterial={handleDeleteMaterial}
      setViewingMaterial={setViewingMaterial}
      handleToggleRead={handleToggleRead}
      materials={materials}
      handleDeleteCreator={handleDeleteCreator}
      handleDeleteSubject={handleDeleteSubject}
      viewingMaterial={viewingMaterial}
      showAddModal={showAddModal}
      editingMaterial={editingMaterial}
      handleSaveMaterial={handleSaveMaterial}
      matType={matType}
      setMatType={setMatType}
      setUploadedFileUrl={setUploadedFileUrl}
      uploadedFileUrl={uploadedFileUrl}
      handleFileUpload={handleFileUpload}
      uploadProgress={uploadProgress}
      matTitle={matTitle}
      setMatTitle={setMatTitle}
      matUrl={matUrl}
      setMatUrl={setMatUrl}
      matDesc={matDesc}
      setMatDesc={setMatDesc}
      matSubjectId={matSubjectId}
      setMatSubjectId={setMatSubjectId}
      matCreatorId={matCreatorId}
      setMatCreatorId={setMatCreatorId}
      matTags={matTags}
      setMatTags={setMatTags}
      matNotes={matNotes}
      setMatNotes={setMatNotes}
      copyToClipboard={copyToClipboard}
      showSubjectModal={showSubjectModal}
      setShowSubjectModal={setShowSubjectModal}
      handleSaveSubject={handleSaveSubject}
      newSubName={newSubName}
      setNewSubName={setNewSubName}
      subjectColorPresets={subjectColorPresets}
      newSubColor={newSubColor}
      setNewSubColor={setNewSubColor}
      showCreatorModal={showCreatorModal}
      setShowCreatorModal={setShowCreatorModal}
      handleSaveCreator={handleSaveCreator}
      newCrName={newCrName}
      setNewCrName={setNewCrName}
      newCrPlatform={newCrPlatform}
      setNewCrPlatform={setNewCrPlatform}
      newCrHandle={newCrHandle}
      setNewCrHandle={setNewCrHandle}
      newCrProfileUrl={newCrProfileUrl}
      setNewCrProfileUrl={setNewCrProfileUrl}
      todos={todos}
      monthlyTargets={monthlyTargets}
      handleCreateTodo={handleCreateTodo}
      handleToggleTodo={handleToggleTodo}
      handleDeleteTodo={handleDeleteTodo}
      handleCreateMonthlyTarget={handleCreateMonthlyTarget}
      handleToggleMonthlyTarget={handleToggleMonthlyTarget}
      handleDeleteMonthlyTarget={handleDeleteMonthlyTarget}
    />
  )
}


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
  )
}
