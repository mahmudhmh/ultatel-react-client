import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import * as api from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "./Pagination";

interface Student {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: string;
  country: string;
}

interface SortConfig {
  key: keyof Student;
  direction: "ascending" | "descending";
}

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(
    undefined
  );
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchAge, setSearchAge] = useState("");
  const [searchCountry, setSearchCountry] = useState("");
  const [searchGender, setSearchGender] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const { token, logout } = useAuth();

  const fetchStudents = async () => {
    if (token) {
      try {
        const data: Student[] = await api.getStudents(token);
        setStudents(data);
        setFilteredStudents(data);
      } catch (error) {
        console.error("Failed to fetch students", error);
      }
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [token]);

  const handleSearch = () => {
    let filtered = students;

    if (searchTerm) {
      filtered = filtered.filter((student) =>
        `${student.firstName} ${student.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (searchAge) {
      const ageNumber = parseInt(searchAge, 10);
      if (!isNaN(ageNumber)) {
        filtered = filtered.filter(
          (student) => parseInt(student.age, 10) === ageNumber
        );
      }
    }

    if (searchCountry) {
      filtered = filtered.filter((student) =>
        student.country.toLowerCase().includes(searchCountry.toLowerCase())
      );
    }

    if (searchGender) {
      filtered = filtered.filter((student) =>
        student.gender.toLowerCase().includes(searchGender.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
  };

  const handleReset = () => {
    setSearchTerm("");
    setSearchAge("");
    setSearchCountry("");
    setSearchGender("");
    setFilteredStudents(students);
  };

  const openAddModal = () => {
    setSelectedStudent(undefined);
    setModalTitle("Add Student");
    setIsModalOpen(true);
  };

  const openEditModal = (student: Student) => {
    setSelectedStudent(student);
    setModalTitle("Edit Student");
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = (student: Student) => {
    if (selectedStudent && selectedStudent.id) {
      api
        .updateStudent(selectedStudent.id, student, token!)
        .then(() => {
          Swal.fire("Success", "Student updated successfully", "success");
          fetchStudents();
          closeModal();
        })
        .catch(() => {
          Swal.fire("Error", "Failed to update student", "error");
        });
    } else {
      api
        .createStudent(student, token!)
        .then(() => {
          Swal.fire("Success", "Student added successfully", "success");
          fetchStudents();
          closeModal();
        })
        .catch(() => {
          Swal.fire("Error", "Failed to add student", "error");
        });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.deleteStudent(id, token!);
      Swal.fire({
        title: "Confirm Delete",
        text: "Are you sure you want to delete this student?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        confirmButtonColor: "#dc2626",
      });
      fetchStudents();
    } catch (error) {
      Swal.fire("Error", "Failed to delete student", "error");
    }
  };

  const sortedStudents = React.useMemo(() => {
    if (sortConfig) {
      const sorted = [...filteredStudents].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === undefined || bValue === undefined) {
          return 0;
        }

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      return sorted;
    }
    return filteredStudents;
  }, [filteredStudents, sortConfig]);

  const requestSort = (key: keyof Student) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = sortedStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getSortIcon = (columnKey: keyof Student) => {
    if (!sortConfig || sortConfig.key !== columnKey) return faSort;
    return sortConfig.direction === "ascending" ? faSortUp : faSortDown;
  };

  return (
    <div className="p-8">
      <div className="mb-4 flex justify-between items-center">
        <img
          src="https://blog.ultatel.com/_next/static/media/logo-ultatel.8ca0c4a1.webp"
          alt="ULTATEL Logo"
          className="mb-1 w-60"
        />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Students CRUD
        </h2>
        <div className="flex space-x-4">
          <button
            onClick={openAddModal}
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded shadow-md transition"
          >
            Add New Student
          </button>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded shadow-md transition"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-md transition">
        <form className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by Name"
            className="border border-gray-300 dark:border-gray-700 p-2 rounded transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="number"
            placeholder="Search by Age"
            className="border border-gray-300 dark:border-gray-700 p-2 rounded transition"
            value={searchAge}
            onChange={(e) => setSearchAge(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by Country"
            className="border border-gray-300 dark:border-gray-700 p-2 rounded transition"
            value={searchCountry}
            onChange={(e) => setSearchCountry(e.target.value)}
          />
          <select
            className="border border-gray-300 dark:border-gray-700 p-2 rounded transition"
            value={searchGender}
            onChange={(e) => setSearchGender(e.target.value)}
          >
            <option value="">Search by Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </form>
        <div className="flex space-x-4">
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded shadow-md transition"
          >
            Search
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded shadow-md transition"
          >
            Reset
          </button>
        </div>
      </div>
      <Pagination
        studentsPerPage={studentsPerPage}
        totalStudents={filteredStudents.length}
        paginate={paginate}
        currentPage={currentPage}
        setStudentsPerPage={setStudentsPerPage}
      />
      <div className="mt-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("firstName")}
                >
                  Name <FontAwesomeIcon icon={getSortIcon("firstName")} />
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("age")}
                >
                  Age <FontAwesomeIcon icon={getSortIcon("age")} />
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("country")}
                >
                  Country <FontAwesomeIcon icon={getSortIcon("country")} />
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("gender")}
                >
                  Gender <FontAwesomeIcon icon={getSortIcon("gender")} />
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("email")}
                >
                  Email <FontAwesomeIcon icon={getSortIcon("email")} />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-6 py-4 text-gray-900 dark:text-gray-100 whitespace-nowrap">
                    {student.firstName} {student.lastName}
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-gray-100 whitespace-nowrap">
                    {student.age}
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-gray-100 whitespace-nowrap">
                    {student.country}
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-gray-100 whitespace-nowrap">
                    {student.gender}
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-gray-100 whitespace-nowrap">
                    {student.email}
                  </td>
                  <td className="px-6 py-4 flex space-x-4 text-gray-900 dark:text-gray-100 whitespace-nowrap">
                    <button
                      onClick={() => openEditModal(student)}
                      className="text-yellow-500 hover:text-yellow-600 transition"
                      title="Edit"
                    >
                      <FontAwesomeIcon icon={faEdit} size="lg" />
                    </button>
                    <button
                      onClick={() => handleDelete(student.id!)}
                      className="text-red-500 hover:text-red-600 transition"
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          studentsPerPage={studentsPerPage}
          totalStudents={filteredStudents.length}
          paginate={paginate}
          currentPage={currentPage}
          setStudentsPerPage={setStudentsPerPage}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSave}
        title={modalTitle}
        initialData={selectedStudent}
      />
    </div>
  );
};

export default Home;
