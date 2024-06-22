/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import Swal from "sweetalert2";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      Swal.fire("Success", "Registration successful", "success");
      navigate("/login");
    } catch (error: any) {
      Swal.fire("Error", `Registration failed: ${error.message}`, "error");
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
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mt-1 transition"
              required
            />
          </div>
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
              required
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
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mt-1 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded mt-4 transition"
          >
            Register
          </button>
        </form>
        <div className="mt-4">
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
