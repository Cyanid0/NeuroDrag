"use client";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  generatedCode: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, generatedCode }) => {
  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    alert("Code copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-[70%] flex justify-center items-center z-100">
      <div className="bg-[#27272a] p-4 rounded shadow-lg ">
        <h3 className="text-lg font-semibold mb-2">Generated Model Code</h3>
        <pre className="bg-black p-2 mb-4 overflow-auto">{generatedCode}</pre>
        <div className="flex justify-end">
          <button
            className="bg-black text-white px-3 py-1 rounded mr-2"
            onClick={handleCopy}
          >
            Copy Code
          </button>
          <button
            className="bg-white text-red-500 px-3 py-1 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
