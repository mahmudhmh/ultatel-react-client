import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await api.loginUser(formData);
      login(data.accessToken);
      Swal.fire("Success", "Login successful", "success");
      navigate("/home");
    } catch (error) {
      Swal.fire("Error", "Login error", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md transition text-center">
        <img
          src="https://blog.ultatel.com/_next/static/media/logo-ultatel.8ca0c4a1.webp"
          alt="ULTATEL Logo"
          className="mx-auto mb-4 w-60"
        />
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Welcome
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mt-1 transition"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mt-1 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded mt-4 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
