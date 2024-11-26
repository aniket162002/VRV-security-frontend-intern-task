import React from "react";
import { BellIcon } from "@heroicons/react/outline";

const Navbar = () => {
  return (
    <nav className="bg-primary text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">RBAC Dashboard</h1>
      <div className="flex items-center gap-4">
        <BellIcon className="w-6 h-6 hover:text-accent cursor-pointer" />
        <span className="text-sm">Admin</span>
      </div>
    </nav>
  );
};

export default Navbar;
