import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useEmployee } from "../hooks/useEmployee";

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const { useEmployeeList, useEmployeeDelete } = useEmployee();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeeList = await useEmployeeList();

        setEmployees(employeeList);
      } catch (error) {
        console.error("Error fetching employee list:", error);
      }
    };

    // Fetch initially
    fetchEmployees();

    // Set interval to fetch every 2 seconds
    const interval = setInterval(fetchEmployees, 2000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [refresh]);

  const handleEdit = (employeeId) => {
    navigate(`/admin/edit/${employeeId}`);
  };

  const handleDelete = async (employeeId) => {
    try {
      console.log("Deleting Employee ID:", employeeId);
      const response = await useEmployeeDelete(employeeId);
      console.log("Delete Response:", response);

      if (response && response.status === 200) {
        setRefresh((prev) => !prev);
      } else {
        console.error("Failed to delete employee.");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedFilteredEmployees = useMemo(() => {
    let filtered = [...employees];

    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter((employee) =>
        Object.values(employee).some(
          (value) =>
            typeof value === "string" && value.toLowerCase().includes(query)
        )
      );
    }

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue == null) return 1;
        if (bValue == null) return -1;

        if (sortConfig.key.toLowerCase().includes("date")) {
          const aDate = new Date(aValue);
          const bDate = new Date(bValue);
          return sortConfig.direction === "ascending"
            ? aDate - bDate
            : bDate - aDate;
        }

        if (typeof aValue === "string" && typeof bValue === "string") {
          const comparison = aValue.localeCompare(bValue);
          return sortConfig.direction === "ascending"
            ? comparison
            : -comparison;
        }

        return sortConfig.direction === "ascending"
          ? aValue - bValue
          : bValue - aValue;
      });
    }

    return filtered;
  }, [employees, searchTerm, sortConfig]);

  const totalPages = Math.ceil(
    sortedFilteredEmployees.length / employeesPerPage
  );
  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * employeesPerPage;
    return sortedFilteredEmployees.slice(
      startIndex,
      startIndex + employeesPerPage
    );
  }, [sortedFilteredEmployees, currentPage, employeesPerPage]);

  const tableHeaders = [
    { key: "avatar", label: "Avatar" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "mobile_No", label: "Mobile Number" },
    { key: "_id", label: "ID" },
    { key: "createdAt", label: "Date Created" },
  ];

  return (
    <div className="h-screen w-full mx-auto p-6 bg-white shadow-md rounded-lg overflow-auto">
      <h2 className="text-2xl font-semibold mb-4">Employee Profiles</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by name, email, mobile, or ID"
        className="mb-4 p-2 border border-gray-300 rounded w-full md:w-1/3"
      />
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            {tableHeaders.map((header) => (
              <th
                key={header.key}
                className="py-2 px-4 capitalize cursor-pointer select-none"
                onClick={() => handleSort(header.key)}
              >
                <div className="flex items-center">
                  {header.label}
                  {sortConfig.key === header.key &&
                    (sortConfig.direction === "ascending" ? " ▲" : " ▼")}
                </div>
              </th>
            ))}
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEmployees.length > 0 ? (
            paginatedEmployees.map((employee) => (
              <tr key={employee._id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">
                  {employee.avatar ? (
                    <img
                      src={employee.avatar}
                      alt="Avatar"
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white">
                      N/A
                    </div>
                  )}
                </td>
                <td className="py-2 px-4">{employee.name || "N/A"}</td>
                <td className="py-2 px-4">{employee.email || "N/A"}</td>
                <td className="py-2 px-4">{employee.mobile_No || "N/A"}</td>
                <td className="py-2 px-4">{employee._id || "N/A"}</td>
                <td className="py-2 px-4">
                  {employee.createdAt
                    ? new Date(employee.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleEdit(employee._id)}
                    className="text-blue-500 hover:text-blue-700 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(employee._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={tableHeaders.length + 1}
                className="text-center py-4 text-gray-500"
              >
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
