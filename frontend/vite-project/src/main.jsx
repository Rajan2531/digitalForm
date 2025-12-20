// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./index.css";
// import App from "./App.jsx";
// import Dashboard from "./components/Dashboard.jsx";
// import InvestmentCalculator from "./InvestmentCalculator.jsx";
// import Tts from "./components/tts.jsx";
// //import AuthProvider from './context/AuthProvider.jsx'
// import LoginPage from "./pages/LoginPage.jsx";
// import ProtectedRoute from "./components/ProtectedRoute.jsx";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import ContextProvider from "./context/GlobalContext.jsx";
// const queryClient = new QueryClient();

// createRoot(document.getElementById("root")).render(
//   <ContextProvider>
//     <QueryClientProvider client={queryClient}>
//       <BrowserRouter>
//         <Routes>
//           <Route index element={<App />} />
//           <Route path="/login" element={<LoginPage />} />

//           <Route
//             path="/dashboard"
//             element={
//                <ProtectedRoute>
//               <Dashboard />

//                </ProtectedRoute>
//             }
//           />
//         </Routes>
        
//       </BrowserRouter>
//     </QueryClientProvider>
//   </ContextProvider>
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import Dashboard from "./components/Dashboard.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ComplaintViewPage from "./components/ComplaintViewPage.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ContextProvider from "./context/GlobalContext.jsx";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
      
        <BrowserRouter>
          <Routes>

            {/* Public routes */}
            <Route index element={<App />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected routes */}
            <Route
              path="/dashboard" replace
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/complaints/:id"
              element={
                <ProtectedRoute>
                  <ComplaintViewPage />
                </ProtectedRoute>
              }
            />

          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ContextProvider>
  </StrictMode>
);
