import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import RoleManagement from "./pages/RoleManagement";
import PermissionGraph from "./components/PermissionGraph";

const App = () => {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-grow bg-gray-100 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/role-management" element={<RoleManagement />} />
            <Route path="/permission-graph" element={<PermissionGraph />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
