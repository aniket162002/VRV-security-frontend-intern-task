import React, { useState } from "react";
import PermissionGraph from "../components/PermissionGraph";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [permissionsData, setPermissionsData] = useState([15, 10, 5]); // Default data

  const handleDataUpdate = (newData) => {
    setPermissionsData(newData);
  };

  return (
    <div className="p-2">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-blue-700 animate-bounce">
       Admin Dashboard
      </h1>

      <div className=" bg-white rounded-lg shadow-lg h-88">
        <h2 className="text-2xl font-bold text-center text-blue-600 ">
          Permissions Overview
        </h2>
        <PermissionGraph data={permissionsData} />
      </div>
    </div>
  );
};

export default Dashboard;
