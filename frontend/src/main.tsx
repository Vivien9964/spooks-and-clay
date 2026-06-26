import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router } from "react-router-dom"
import ErrorBoundary from "@/components/ErrorBoundary"
import ErrorFallbackPage from "@/pages/ErrorFallbackPage"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ErrorBoundary fallback={<ErrorFallbackPage />}>
        <App />
      </ErrorBoundary>
    </Router>
  </StrictMode>
)
