import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Student) => void;
  title: string;
  initialData?: Student;
}

interface Student {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: string;
  country: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  initialData,
}) => {
  const [formData, setFormData] = useState<Student>(
    initialData || {
      firstName: "",
      lastName: "",
      email: "",
      gender: "Male",
      age: "",
      country: "",
    }
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Swal.fire({
      title: "Confirm Save",
      text: "Are you sure you want to save this student?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        onSubmit(formData);
        onClose();
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="relative w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all transform scale-100">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="mt-3 text-center px-6 py-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
          <form onSubmit={handleSubmit} className="mt-2 space-y-4">
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200 mb-2">
                Birth Date
              </label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200 mb-2">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded transition transform hover:scale-105"
            >
              Save
            </button>
          </form>
          <div className="mt-4">
            <button
              onClick={onClose}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition transform hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
