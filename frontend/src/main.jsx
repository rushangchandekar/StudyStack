import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'

// Fetch the Clerk Publishable Key from Vite environment variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  console.warn("Clerk VITE_CLERK_PUBLISHABLE_KEY is not configured in .env. Running in Developer Preview Mode.");
}

// Clerk dark appearance configuration to match our dark glassmorphic theme
const clerkAppearance = {
  baseTheme: dark,
  variables: {
    colorBackground: 'transparent',
    colorInputBackground: 'rgba(30, 41, 59, 0.5)',
    colorInputText: '#f8fafc',
    colorText: '#f8fafc',
    colorTextSecondary: '#94a3b8',
    colorPrimary: '#8b5cf6',
    colorDanger: '#ef4444',
    borderRadius: '12px',
    fontFamily: "'Inter', sans-serif",
  },
  elements: {
    card: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      border: 'none',
    },
    headerTitle: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 700,
    },
    socialButtonsBlockButton: {
      backgroundColor: 'rgba(30, 41, 59, 0.6)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      '&:hover': {
        backgroundColor: 'rgba(51, 65, 85, 0.8)',
        borderColor: '#8b5cf6',
      },
    },
    formFieldInput: {
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      '&:focus': {
        borderColor: '#8b5cf6',
        boxShadow: '0 0 10px rgba(139, 92, 246, 0.15)',
      },
    },
    formButtonPrimary: {
      background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
      boxShadow: '0 4px 14px rgba(139, 92, 246, 0.4)',
      '&:hover': {
        boxShadow: '0 6px 20px rgba(139, 92, 246, 0.5)',
      },
    },
    footerAction: {
      backgroundColor: 'transparent',
    },
    footerActionLink: {
      color: '#8b5cf6',
      fontWeight: 600,
    },
  },
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {PUBLISHABLE_KEY ? (
      <ClerkProvider 
        publishableKey={PUBLISHABLE_KEY} 
        afterSignOutUrl="/"
        appearance={clerkAppearance}
      >
        <App isMockMode={false} />
      </ClerkProvider>
    ) : (
      <App isMockMode={true} />
    )}
  </React.StrictMode>,
)

