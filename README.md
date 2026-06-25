# StudyStack - Premium Student Resource & Task Manager

StudyStack is a modern web application designed for students to organize, track, and conquer their academic materials and tasks. Built with a FastAPI backend and a React (Vite) frontend, StudyStack combines structured study resource management with dynamic dashboards, progress indicators, and task trackers under a unified glassmorphic dark theme.

---

## Key Features

### 1. Resource Management Hub
- **Study Materials Tracker**: Add, edit, and organize study links (YouTube videos, GitHub repositories, PDFs, Google Drive documents, or web pages).
- **Custom Categorization**: Create academic subjects with custom colors to organize your materials.
- **Status Indicators**: Star favorite resources, group materials under folders, and mark documents as read or completed.
- **File Uploads**: Upload documents directly to the local server or cloud storage.

### 2. Analytical Dashboard
- **Stats Row**: Real-time counters for Total Materials, Starred Materials, Read/Completed Materials, and Uploaded Documents.
- **Subjects Distribution Bar Chart**: A custom-designed vertical bar chart visualizes material concentration per subject. Features interactive hover tooltips and dynamic grid lines indicating percentage scales.
- **Interactive Progress Card**: A circular radial progress indicator with a toggle dropdown to switch between **Task Progress** and **Monthly Target Progress**.

### 3. Checklist Systems
- **Study Tasks (To-Do List)**: A daily checklist for active study items (e.g., "Review operating systems lecture notes") with live progress tracking and CRUD capabilities.
- **Monthly Targets Checklist**: A distinct checklist scoped to the active calendar month, enabling students to set and check off broader monthly milestones.

### 4. Authentication
- **Secure Access**: Powered by Clerk Auth (`@clerk/clerk-react`) for secure user onboarding, sign-in, and auth-token validation on the backend.

### 5. Backend Architecture
- **API Engine**: Engineered with FastAPI for high-throughput async processing and clean Pydantic model validations.
- **Dual-Database Mode**:
  - **Supabase Connected**: Performs live SQL queries on a Supabase PostgreSQL database when cloud credentials are provided.
  - **Offline Fallback**: Automatically falls back to a local JSON database (`local_db.json`) when offline or during sandbox testing, ensuring zero setup friction.

---

## Tech Stack

### Frontend
- **Core**: React 19, Vite
- **Authentication**: Clerk Authentication
- **Icons**: Lucide React
- **Styling**: Modern Vanilla CSS (Glassmorphism, custom HSL color systems, responsive flex/grid layouts)

### Backend
- **Framework**: FastAPI
- **Database / BaaS**: Supabase Python Client (PostgreSQL) with a Local JSON fallback adapter
- **Server**: Uvicorn
- **Validation**: Pydantic v2

---

## Project Structure

```text
Resource management/
├── backend/
│   ├── app/
│   │   ├── auth.py          # Clerk JWT validation middleware
│   │   ├── config.py        # Environment configurations (Clerk, Supabase, Mock Mode)
│   │   ├── database.py      # Dual-mode database adapter (Supabase SQL & local JSON fallback)
│   │   └── main.py          # FastAPI application routes and Pydantic schemas
│   ├── uploads/             # Directory for locally uploaded student materials
│   ├── local_db.json        # Offline database mockup file
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components (StatsBanner, MaterialsList, Sidebar, etc.)
│   │   ├── pages/           # Pages (LandingPage, DashboardPage, SignInPage)
│   │   ├── App.jsx          # Root application layout, auth wrapper, and state orchestration
│   │   ├── api.js           # API client mapping backend endpoints
│   │   ├── index.css        # Core design system tokens and glassmorphic stylesheet
│   │   └── main.jsx         # React DOM mount point
│   ├── package.json         # Frontend Node.js dependencies
│   └── vite.config.js       # Vite configuration
└── README.md                # Project documentation
```

---

## Getting Started

### Prerequisites
- Python 3.9 or higher
- Node.js 18 or higher

---

### Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables**:
   Create a `.env` file in the `backend/` directory:
   ```env
   # Clerk configurations
   CLERK_API_URL=https://api.clerk.com/v1
   CLERK_JWKS_URL=https://your-clerk-instance.clerk.accounts.dev/.well-known/jwks.json

   # Supabase configurations (Optional: omission triggers local JSON database mode)
   SUPABASE_URL=https://your-supabase-project.supabase.co
   SUPABASE_KEY=your-supabase-anon-key
   ```

4. **Run the API server**:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   The backend API will run on `http://localhost:8000`.

---

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env.local` file in the `frontend/` directory:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
   VITE_API_URL=http://localhost:8000
   ```

4. **Run the frontend development server**:
   ```bash
   npm run dev
   ```
   Vite will serve the frontend locally (typically on `http://localhost:5173`).

---

## Database Schema (SQL)
To initialize the Supabase database, run the following queries in your Supabase SQL Editor:

```sql
-- 1. Create the 'todos' table
create table if not exists public.todos (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  text text not null,
  is_completed boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create the 'monthly_targets' table
create table if not exists public.monthly_targets (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  month text not null, -- Format: "YYYY-MM" (e.g., "2026-06")
  text text not null,
  is_completed boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create the 'subjects' table
create table if not exists public.subjects (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  name text not null,
  color text default '#8B5CF6' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create the 'materials' table
create table if not exists public.materials (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  title text not null,
  type text not null, -- 'youtube', 'github', 'pdf', 'website', etc.
  url text not null,
  description text,
  subject_id uuid references public.subjects(id) on delete set null,
  is_favorite boolean default false not null,
  is_read boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

---

## Notes
> - **Supabase Row-Level Security (RLS)**: Ensure Row-Level Security (RLS) is disabled for these tables if using the standard client key without policies, or configure policies to permit authenticated Clerk users.
