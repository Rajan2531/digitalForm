import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Dashboard from './components/Dashboard.jsx'
import InvestmentCalculator from './InvestmentCalculator.jsx'
import Tts from './components/tts.jsx'
//import AuthProvider from './context/AuthProvider.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  
   <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
        <Route index element = {<App/>}/>
  <Route path="/login" element={<LoginPage />} />

  <Route
    path="/dashboard"
    element={
      //  <ProtectedRoute>
        <Dashboard />
      // </ProtectedRoute>
    }
  />
</Routes>
      </BrowserRouter>
      </QueryClientProvider>
   
  );



