import React, { useState } from "react";

const UserTable = ({ users, onUpdate }) => {
  const [editingUser, setEditingUser] = useState(null);

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    onUpdate(updatedUsers);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = () => {
    const updatedUsers = users.map((user) =>
      user.id === editingUser.id ? editingUser : user
    );
    onUpdate(updatedUsers);
    setEditingUser(null);
  };

  return (
    <table className="w-full bg-white shadow rounded-lg">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-4">Name</th>
          <th className="p-4">Role</th>
          <th className="p-4">Status</th>
          <th className="p-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="border-b hover:bg-gray-100">
            <td className="p-4">
              {editingUser?.id === user.id ? (
                <input
                  value={editingUser.name}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, name: e.target.value })
                  }
                  className="border rounded p-2"
                />
              ) : (
                user.name
              )}
            </td>
            <td className="p-4">{user.role}</td>
            <td className="p-4">{user.status}</td>
            <td className="p-4 flex gap-2">
              {editingUser?.id === user.id ? (
                <button
                  onClick={handleSave}
                  className="text-green-500 hover:underline"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(user)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(user.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
