import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  studentsPerPage: number;
  totalStudents: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
  setStudentsPerPage: (entries: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  studentsPerPage,
  totalStudents,
  paginate,
  currentPage,
  setStudentsPerPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalStudents / studentsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStudentsPerPage(parseInt(e.target.value, 10));
    paginate(1);
  };

  return (
    <div className="flex items-center justify-between my-4">
      <div className="flex items-center space-x-2">
        <label className="text-gray-600 dark:text-gray-300">
          Entries per page:
        </label>
        <select
          className="border border-gray-300 dark:border-gray-700 p-2 rounded"
          onChange={handleEntriesChange}
          value={studentsPerPage}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
      <ul className="flex items-center space-x-2">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-2 py-1 ${
            currentPage === 1 ? "text-gray-400" : "text-blue-500"
          } cursor-pointer`}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`px-2 py-1 ${
              currentPage === number
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-600 dark:text-white text-black"
            } rounded cursor-pointer transition`}
          >
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
          className={`px-2 py-1 ${
            currentPage === pageNumbers.length
              ? "text-gray-400"
              : "text-blue-500"
          } cursor-pointer`}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </ul>
      <div className="text-gray-600 dark:text-gray-300">
        Page {currentPage} of {pageNumbers.length}, showing {studentsPerPage}{" "}
        entries per page
      </div>
    </div>
  );
};

export default Pagination;
