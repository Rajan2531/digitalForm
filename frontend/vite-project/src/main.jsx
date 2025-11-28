import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Dashboard from './components/Dashboard.jsx'
import InvestmentCalculator from './InvestmentCalculator.jsx'
import Tts from './components/tts.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <Routes>
    <Route index element = {<App/>}/>
    <Route path = "/Dashboard" element = {<Dashboard/>}/>
    <Route path = "/Calc" element = {<InvestmentCalculator/>}/>
    <Route path = "/tts" element = {<Tts/>}/>
  </Routes>
    
  </BrowserRouter>
    
  </StrictMode>,
)
