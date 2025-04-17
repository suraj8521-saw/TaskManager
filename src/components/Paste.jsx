import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import { Link } from 'react-router-dom';
import { FaEdit, FaRegEye, FaTrash, FaCopy, FaShareAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  }

  const handleShare = async (paste) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: paste.title,
          text: paste.content,
        });
        toast.success("Share Your Containt!");
      } catch (err) {
        toast.error("Sharing failed!");
      }
    } else {
      toast("Sharing not supported on this device", { icon: "🚫" });
    }
  };

  const filteredData = pastes.filter((paste) =>
    (paste?.title?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 py-2">
      <input
        className="p-2 border-2 rounded-2xl w-full max-w-[600px] mt-5"
        type="search"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => (
            <div className="border-2 rounded-xl p-4 shadow-md" key={paste?._id}>
              <h2 className="text-xl font-semibold mb-2">{paste.title}</h2>
              <p className="mb-3 whitespace-pre-wrap break-words">{paste.content}</p>
              <div className="flex flex-wrap gap-4 mb-2">
                <Link to={`/?pasteId=${paste?._id}`} className="flex items-center gap-2 text-blue-600">
                  <FaEdit /> Edit
                </Link>
                <Link to={`/pastes/${paste?._id}`} className="flex items-center gap-2 text-green-600">
                  <FaRegEye /> View
                </Link>
                <button onClick={() => handleDelete(paste?._id)} className="flex items-center gap-2 text-red-600">
                  <FaTrash /> Delete
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to clipboard");
                  }}
                  className="flex items-center gap-2 text-yellow-600"
                >
                  <FaCopy /> Copy
                </button>
                <button
                  onClick={() => handleShare(paste)}
                  className="flex items-center gap-2 text-purple-600"
                >
                  <FaShareAlt /> Share
                </button>
              </div>
              <div className="text-gray-500 text-sm">
                {formatDate(paste.createdAt)}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Paste;
