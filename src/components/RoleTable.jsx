import React, { useState } from "react";
import PermissionManager from "./PermissionManager";

const RoleTable = ({ roles, onUpdate }) => {
  const [editingRole, setEditingRole] = useState(null);
  const [showPermissions, setShowPermissions] = useState(null);

  const handleDelete = (id) => {
    const updatedRoles = roles.filter((role) => role.id !== id);
    onUpdate(updatedRoles);
  };

  const handleEdit = (role) => {
    setEditingRole(role);
  };

  const handleSave = () => {
    const updatedRoles = roles.map((role) =>
      role.id === editingRole.id ? editingRole : role
    );
    onUpdate(updatedRoles);
    setEditingRole(null);
  };

  const handleAddRole = () => {
    const newRole = {
      id: Date.now(),
      name: "New Role",
      permissions: [],
    };
    const updatedRoles = [...roles, newRole];
    onUpdate(updatedRoles);
  };

  const togglePermissions = (role) => {
    setShowPermissions(showPermissions === role.id ? null : role.id);
  };

  return (
    <div>
      <button
        onClick={handleAddRole}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Role
      </button>
      <table className="w-full bg-white shadow rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-4">Role Name</th>
            <th className="p-4">Permissions</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id} className="border-b hover:bg-gray-100">
              <td className="p-4">
                {editingRole?.id === role.id ? (
                  <input
                    value={editingRole.name}
                    onChange={(e) =>
                      setEditingRole({ ...editingRole, name: e.target.value })
                    }
                    className="border rounded p-2"
                  />
                ) : (
                  role.name
                )}
              </td>
              <td className="p-4">
                <button
                  onClick={() => togglePermissions(role)}
                  className="text-blue-500 hover:underline"
                >
                  {showPermissions === role.id ? "Hide" : "Manage Permissions"}
                </button>
                {showPermissions === role.id && (
                  <PermissionManager
                    role={role}
                    onUpdate={(updatedRole) => {
                      const updatedRoles = roles.map((r) =>
                        r.id === updatedRole.id ? updatedRole : r
                      );
                      onUpdate(updatedRoles);
                    }}
                  />
                )}
              </td>
              <td className="p-4 flex gap-2">
                {editingRole?.id === role.id ? (
                  <button
                    onClick={handleSave}
                    className="text-green-500 hover:underline"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(role)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(role.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleTable;
