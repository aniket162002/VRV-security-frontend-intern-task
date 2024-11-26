import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <div className="p-4">{children}</div>
        <div className="flex justify-end p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
