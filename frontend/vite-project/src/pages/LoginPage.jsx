// import React, { useState } from "react";
// import { useLoginMutation } from "../hooks/useLoginMutation";
// import { useNavigate } from "react-router-dom";

// export default function LoginPage() {
//   const loginMutation = useLoginMutation();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("cybercellssd@gmail.com");
//   const [password, setPassword] = useState("$Ssd#@2025");

//   const handleLogin = (e) => {
//     e.preventDefault();
//     loginMutation.mutate(
//       { email, password },
//       {
//         onSuccess: () => {
//           navigate("/dashboard", { replace: true });
//         },
//       }
//     );
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <form className="p-6 bg-white rounded-lg shadow" onSubmit={handleLogin}>
//         <h2 className="text-xl font-semibold mb-4">Admin Login</h2>

//         {loginMutation.isError && (
//           <p className="text-red-500 text-sm mb-2">
//             {loginMutation.error.response?.data?.message || "Login failed"}
//           </p>
//         )}

//         <input
//           className="w-full px-3 py-2 border rounded mb-3"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           className="w-full px-3 py-2 border rounded mb-4"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button className="w-full bg-indigo-600 text-white py-2 rounded">
//           {loginMutation.isPending ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useLoginMutation } from "../hooks/useLoginMutation";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const loginMutation = useLoginMutation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("cybercellssd@gmail.com");
  const [password, setPassword] = useState("$Ssd#@2025");

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => navigate("/dashboard", { replace: true }),
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-gray-900 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8">
        
        {/* Header / Branding */}
        <div className="text-center mb-6">
          <img
            src="/favicon.png"
            alt="Kolkata Police Logo"
            className="mx-auto w-20 mb-2"
          />
          <h1 className="text-2xl font-bold text-blue-900">
            Cyber Cell – Kolkata Police
          </h1>
          <p className="text-sm text-gray-600">Admin Login Portal</p>
        </div>

        {loginMutation.isError && (
          <p className="text-red-600 text-sm mb-3 text-center">
            {loginMutation.error.response?.data?.message || "Login failed"}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
              placeholder="Enter official email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            disabled={loginMutation.isPending}
            className={`w-full py-2 rounded-lg text-white font-semibold transition
              ${
                loginMutation.isPending
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-800"
              }`}
          >
            {loginMutation.isPending ? "Verifying..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} Kolkata Police Cyber Cell — All Rights Reserved
        </p>
      </div>
    </div>
  );
}
