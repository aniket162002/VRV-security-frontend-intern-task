import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Simulating API for managing roles
const mockApi = {
  getRoles: () => {
    return JSON.parse(localStorage.getItem("roles")) || [];
  },
  addRole: (role) => {
    const roles = mockApi.getRoles();
    roles.push(role);
    localStorage.setItem("roles", JSON.stringify(roles));
  },
  updateRole: (updatedRole) => {
    let roles = mockApi.getRoles();
    roles = roles.map((role) =>
      role.id === updatedRole.id ? updatedRole : role
    );
    localStorage.setItem("roles", JSON.stringify(roles));
  },
  deleteRole: (roleId) => {
    let roles = mockApi.getRoles();
    roles = roles.filter((role) => role.id !== roleId);
    localStorage.setItem("roles", JSON.stringify(roles));
  },
};

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [newRoleName, setNewRoleName] = useState("");
  const [rolePermissions, setRolePermissions] = useState([]);
  const [editRole, setEditRole] = useState(null);

  useEffect(() => {
    // Fetch roles from local storage on component mount
    setRoles(mockApi.getRoles());
  }, []);

  const handleAddRole = () => {
    const newRole = {
      id: Date.now(),
      name: newRoleName,
      permissions: rolePermissions,
    };
    mockApi.addRole(newRole);
    setRoles(mockApi.getRoles());
    setNewRoleName("");
    setRolePermissions([]);
    toast.success("Role added successfully!"); // Toast notification
  };

  const handleEditRole = (role) => {
    setEditRole(role);
    setNewRoleName(role.name);
    setRolePermissions(role.permissions);
  };

  const handleUpdateRole = () => {
    const updatedRole = { ...editRole, name: newRoleName, permissions: rolePermissions };
    mockApi.updateRole(updatedRole);
    setRoles(mockApi.getRoles());
    setEditRole(null);
    setNewRoleName("");
    setRolePermissions([]);
    toast.info("Role updated successfully!"); // Toast notification
  };

  const handleDeleteRole = (roleId) => {
    mockApi.deleteRole(roleId);
    setRoles(mockApi.getRoles());
    toast.error("Role deleted successfully!"); // Toast notification
  };

  const togglePermission = (permission) => {
    setRolePermissions((prevPermissions) => {
      if (prevPermissions.includes(permission)) {
        return prevPermissions.filter((perm) => perm !== permission);
      } else {
        return [...prevPermissions, permission];
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Role Management</h2>

      {/* Form to add or edit roles */}
      <div className="flex flex-col bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
          placeholder="Role Name"
          className="p-2 border border-gray-300 rounded-lg mb-4"
        />

        <div className="mb-4">
          <h3 className="text-xl mb-2">Permissions</h3>
          <div className="flex gap-4">
            {["Read", "Write", "Delete"].map((permission) => (
              <label key={permission} className="flex items-center">
                <input
                  type="checkbox"
                  checked={rolePermissions.includes(permission)}
                  onChange={() => togglePermission(permission)}
                  className="mr-2"
                />
                {permission}
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          {editRole ? (
            <button
              onClick={handleUpdateRole}
              className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Update Role
            </button>
          ) : (
            <button
              onClick={handleAddRole}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Role
            </button>
          )}
          <button
            onClick={() => {
              setEditRole(null);
              setNewRoleName("");
              setRolePermissions([]);
            }}
            className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* List roles */}
      <h3 className="text-2xl font-bold mt-8 mb-4">Existing Roles</h3>
      <ul className="bg-white shadow-lg rounded-lg p-4">
        {roles.length === 0 ? (
          <li className="p-2 text-gray-500">No roles available.</li>
        ) : (
          roles.map((role) => (
            <li key={role.id} className="p-2 border-b border-gray-300 last:border-b-0">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-semibold">{role.name}</h4>
                  <p className="text-sm text-gray-500">Permissions: {role.permissions.join(", ")}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditRole(role)}
                    className="p-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRole(role.id)}
                    className="p-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RoleManagement;
