<div align="center">

# 📚 StudyStack

### Your Personal Academic Command Center

[![Built with React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![Clerk Auth](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)

**Stop losing study links in 47 browser tabs.** StudyStack is a full-stack web app that lets students organize study resources, track daily tasks, set monthly academic targets, and visualize progress — all from a single, beautiful dark-themed dashboard.

---

[Features](#-features) · [Tech Stack](#-tech-stack) · [Quick Start](#-quick-start) · [Project Structure](#-project-structure) · [Database Setup](#-database-setup) · [API Reference](#-api-reference) · [Contributing](#-contributing)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 📊 Analytics Dashboard
- Real-time stat cards (Total, Starred, Completed, Uploaded)
- Interactive **vertical bar chart** showing material distribution across subjects with hover tooltips
- Circular **radial progress ring** with dropdown toggle between Task Progress & Monthly Progress

</td>
<td width="50%">

### 📁 Resource Manager
- Save links from **YouTube, GitHub, Google Drive, websites, PDFs** and more
- Organize into color-coded **subjects** and tag with **creators**
- Star favorites, mark as read, add personal notes
- **Direct file uploads** with progress indicator

</td>
</tr>
<tr>
<td width="50%">

### ✅ Study Tasks (To-Do)
- Daily task checklist with inline add/delete/toggle
- Linear progress bar tracks completion percentage
- Feeds into the dashboard's radial progress ring
- Persistent across sessions via Supabase

</td>
<td width="50%">

### 🎯 Monthly Targets
- Month-scoped goal tracker that resets per calendar month
- Independent progress bar and completion counter
- Separate radial view in the progress card dropdown
- Perfect for exam prep milestones and reading goals

</td>
</tr>
<tr>
<td width="50%">

### 👥 Creators Hub
- Track content creators you learn from (YouTube, Instagram, LinkedIn, Medium)
- Store handles and profile URLs
- Link creators directly to saved materials

</td>
<td width="50%">

### 🔐 Authentication & Security
- Powered by **Clerk** for sign-up, sign-in, and session management
- JWT token verification on every backend request
- User-scoped data isolation — your resources are yours alone

</td>
</tr>
</table>

---

## 🎨 Design Philosophy

StudyStack isn't just functional — it's designed to feel **premium**.

- 🌑 **Dark glassmorphic theme** with layered transparency and subtle borders
- 🎨 **Custom HSL color system** — no generic reds and blues, everything is curated
- ✨ **Micro-animations** on hover, transitions on data changes, smooth state shifts
- 📐 **Responsive grid layouts** that adapt from wide monitors to laptop screens
- 🔤 **Modern typography** with a dual font-family system (headers vs body)

---

## 🛠 Tech Stack

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                             │
│                                                             │
│   React 19  ·  Vite 8  ·  Vanilla CSS  ·  Lucide Icons     │
│   Clerk React SDK  ·  Glassmorphic Design System            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                        BACKEND                              │
│                                                             │
│   FastAPI  ·  Uvicorn  ·  Pydantic v2  ·  Python 3.9+      │
│   Supabase Python Client  ·  python-jose (JWT)              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                       DATABASE                              │
│                                                             │
│   Supabase (PostgreSQL)  ·  Local JSON fallback adapter     │
│   Dual-mode: auto-detects cloud vs offline                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

| Tool | Version |
|------|---------|
| Python | 3.9+ |
| Node.js | 18+ |
| npm | 9+ |

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/studystack.git
cd studystack
```

### 2️⃣ Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

Create `backend/.env`:

```env
# Clerk Auth
CLERK_JWKS_URL=https://your-clerk-instance.clerk.accounts.dev/.well-known/jwks.json

# Supabase (leave empty to use local JSON fallback)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key
```

Start the API server:

```bash
uvicorn app.main:app --reload --port 8000
```

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
```

Create `frontend/.env.local`:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your-key-here
VITE_API_URL=http://localhost:8000
```

Start the dev server:

```bash
npm run dev
```

### 4️⃣ Open in browser

Navigate to `http://localhost:5173` — sign in and start stacking! 🎉

---

## 📂 Project Structure

```
studystack/
│
├── backend/
│   ├── app/
│   │   ├── auth.py            # Clerk JWT verification middleware
│   │   ├── config.py          # Environment variable loader
│   │   ├── database.py        # Dual-mode DB adapter (Supabase ↔ Local JSON)
│   │   └── main.py            # FastAPI routes, Pydantic schemas, CORS config
│   ├── uploads/               # Local file upload storage
│   ├── local_db.json          # Offline fallback database
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DashboardHeader.jsx   # Top bar with search & filters
│   │   │   ├── MaterialsList.jsx     # Resource cards grid view
│   │   │   ├── Modals.jsx            # Add/Edit/View material dialogs
│   │   │   ├── Sidebar.jsx           # Navigation sidebar with Clerk user button
│   │   │   └── StatsBanner.jsx       # Dashboard analytics, charts & task lists
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx     # Main authenticated dashboard
│   │   │   ├── LandingPage.jsx       # Public marketing landing page
│   │   │   └── SignInPage.jsx        # Clerk-powered sign-in page
│   │   ├── App.jsx                   # Root component, auth state, data orchestration
│   │   ├── api.js                    # API client (all fetch calls to backend)
│   │   ├── index.css                 # Full design system (tokens, components, animations)
│   │   └── main.jsx                  # React DOM entry point
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🗄 Database Setup

Run these queries in your **Supabase SQL Editor** to initialize the schema:

<details>
<summary><strong>📋 Click to expand full SQL schema</strong></summary>

```sql
-- Subjects table
create table if not exists public.subjects (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  name text not null,
  color text default '#8B5CF6' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Materials table
create table if not exists public.materials (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  title text not null,
  type text not null,
  url text not null,
  description text,
  subject_id uuid references public.subjects(id) on delete set null,
  creator_id uuid,
  is_favorite boolean default false not null,
  is_read boolean default false not null,
  tags text[] default '{}',
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- To-do tasks table
create table if not exists public.todos (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  text text not null,
  is_completed boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Monthly targets table
create table if not exists public.monthly_targets (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  month text not null,
  text text not null,
  is_completed boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Disable RLS for development (enable + add policies for production)
alter table public.subjects disable row level security;
alter table public.materials disable row level security;
alter table public.todos disable row level security;
alter table public.monthly_targets disable row level security;
```

</details>

> **⚠️ Production Note:** Enable Row-Level Security and create proper policies before deploying. The above disables RLS for local development convenience.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ☕ and determination by Rushang**

*If this helped you organize your study chaos, consider giving it a ⭐*

</div>
