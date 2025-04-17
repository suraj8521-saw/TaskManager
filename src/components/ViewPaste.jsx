import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaRegCopy } from "react-icons/fa";
import toast from 'react-hot-toast';

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="text-center text-red-500 mt-10 text-lg font-medium">
        Paste not found!
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(paste.content);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 bg-white rounded-xl shadow-sm">
      
      {/* Title */}
      <input
        type="text"
        value={paste.title}
        disabled
        className="w-full sm:w-4/5 p-3 border border-gray-300 rounded-xl bg-gray-100 cursor-not-allowed text-gray-800 font-semibold"
      />

      {/* Textarea with Copy Button */}
      <div className="relative mt-6 w-full">
        
        {/* Copy button inside container */}
        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 text-sm rounded-lg flex items-center gap-1 shadow"
        >
          <FaRegCopy />
          Copy
        </button>

        {/* Textarea */}
        <textarea
          value={paste.content}
          disabled
          rows={15} // Enough space to show content
          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 pt-12 text-gray-800 text-base resize-none outline-none cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default ViewPaste;
