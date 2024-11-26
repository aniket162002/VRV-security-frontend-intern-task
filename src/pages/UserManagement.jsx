import React, { useEffect, useState } from "react";
import { mockApi } from "../api/mockApi";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", role: "", status: "Active" });
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    const data = await mockApi.getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingUser) {
      await mockApi.updateUser(editingUser.id, formData);
      setEditingUser(null);
    } else {
      await mockApi.addUser(formData);
    }
    setFormData({ name: "", role: "", status: "Active" });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData(user);
  };

  const handleDelete = async (id) => {
    await mockApi.deleteUser(id);
    fetchUsers();
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">User Management</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-4 shadow-lg rounded-lg mb-6"
      >
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
          className="p-2 border border-gray-300 rounded-lg"
        />
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          {editingUser ? "Update User" : "Add User"}
        </button>
      </form>

      <table className="w-full bg-white shadow-lg rounded-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Role</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-blue-50">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">{user.status}</td>
              <td className="p-2 flex gap-2">
                <AiOutlineEdit
                  className="text-blue-500 cursor-pointer hover:text-blue-700"
                  onClick={() => handleEdit(user)}
                />
                <AiOutlineDelete
                  className="text-red-500 cursor-pointer hover:text-red-700"
                  onClick={() => handleDelete(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
