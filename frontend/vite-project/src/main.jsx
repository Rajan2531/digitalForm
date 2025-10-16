import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Dashboard from './components/Dashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <Routes>
    <Route index element = {<App/>}/>
    <Route path = "/Dashboard" element = {<Dashboard/>}/>
  </Routes>
    
  </BrowserRouter>
    
  </StrictMode>,
)
