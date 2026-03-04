import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
