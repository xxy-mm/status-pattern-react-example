import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { StateProvider } from './StateProvider.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StateProvider step={2}>
      <App />
    </StateProvider>
  </React.StrictMode>
)
