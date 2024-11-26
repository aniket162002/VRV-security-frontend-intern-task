import React, { useState, useEffect } from "react";

const PermissionManager = ({ role, onUpdate }) => {
  const [permissions, setPermissions] = useState(role.permissions);

  useEffect(() => {
    setPermissions(role.permissions);
  }, [role]);

  const togglePermission = (permission) => {
    const updatedPermissions = permissions.includes(permission)
      ? permissions.filter((p) => p !== permission)
      : [...permissions, permission];
    setPermissions(updatedPermissions);
    onUpdate({ ...role, permissions: updatedPermissions });
  };

  return (
    <div className="p-4 bg-gray-50 rounded-md shadow-md mt-4">
      <h3 className="text-lg font-semibold">Manage Permissions</h3>
      <div className="flex gap-4 mt-2">
        {["Read", "Write", "Delete"].map((perm) => (
          <button
            key={perm}
            onClick={() => togglePermission(perm)}
            className={`px-4 py-2 rounded-lg ${
              permissions.includes(perm)
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {perm}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PermissionManager;
