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
        onSuccess: () => {
          navigate("/dashboard", { replace: true });
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="p-6 bg-white rounded-lg shadow" onSubmit={handleLogin}>
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>

        {loginMutation.isError && (
          <p className="text-red-500 text-sm mb-2">
            {loginMutation.error.response?.data?.message || "Login failed"}
          </p>
        )}

        <input
          className="w-full px-3 py-2 border rounded mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full px-3 py-2 border rounded mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-indigo-600 text-white py-2 rounded">
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
