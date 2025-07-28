import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/AppContext.tsx' // 1. Import AppProvider

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider> {/* 2. Use AppProvider */}
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
)