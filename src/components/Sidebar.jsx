import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiHome, FiUsers, FiShield, FiBarChart2 } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div
      className={`flex flex-col bg-blue-700 text-white h-screen transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-blue-800">
        <h1 className={`text-lg font-bold transition-all ${isOpen ? "block" : "hidden"}`}>
          Admin Panel
        </h1>
        <button
          onClick={toggleSidebar}
          className="text-2xl focus:outline-none transform transition-transform hover:scale-110"
        >
          <FiMenu />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-grow">
        <ul className="mt-6">
          <li className="px-4 py-2 hover:bg-blue-600 transition-all">
            <Link to="/" className="flex items-center">
              <FiHome className="text-xl mr-4" />
              <span className={`${isOpen ? "block" : "hidden"}`}>Dashboard</span>
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-blue-600 transition-all">
            <Link to="/user-management" className="flex items-center">
              <FiUsers className="text-xl mr-4" />
              <span className={`${isOpen ? "block" : "hidden"}`}>User Management</span>
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-blue-600 transition-all">
            <Link to="/role-management" className="flex items-center">
              <FiShield className="text-xl mr-4" />
              <span className={`${isOpen ? "block" : "hidden"}`}>Role Management</span>
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-blue-600 transition-all">
            <Link to="/permission-graph" className="flex items-center">
              <FiBarChart2 className="text-xl mr-4" />
              <span className={`${isOpen ? "block" : "hidden"}`}>Permission Graph</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="px-4 py-3 bg-blue-800">
        <p className={`${isOpen ? "block" : "hidden"} text-sm text-gray-300`}>
          © 2024 Admin Panel
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
