// import React, { createContext, useContext, useState } from "react";
// import api, { attachTokenStore } from "../api/axios";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export default function AuthProvider({ children }) {
//   const [accessToken, setAccessToken] = useState(null);
//   const [admin, setAdmin] = useState(null);

//   // attach store for axios module
//   attachTokenStore({ accessToken, setAccessToken });

//   const login = async (email, password) => {
//     const res = await api.post("/api/auth/login", { email, password });
//     const { accessToken: token, admin: adminData } = res.data;
//     setAccessToken(token);
//     setAdmin(adminData);
//     return adminData;
//   };

//   const logout = async () => {
//     try {
//       await api.post("/auth/logout");
//     } catch (err) {
//       // ignore
//     }
//     setAccessToken(null);
//     setAdmin(null);
//   };

//   return (
//     <AuthContext.Provider value={{ accessToken, setAccessToken, admin, setAdmin, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
