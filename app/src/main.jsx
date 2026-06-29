import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Gilroy is self-hosted via @font-face in index.css (see /public/fonts/)
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
