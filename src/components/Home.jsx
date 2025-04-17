import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { FiPlus } from 'react-icons/fi'; // 🔥 Icon import

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId]);

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  };

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 justify-between items-start sm:items-center">
        <input
          className="p-2 border-2 rounded-2xl w-full sm:w-[66%] pl-4 font-bold"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="p-2 px-4 border-2 rounded-2xl bg-blue-500 text-white hover:bg-blue-600 transition flex items-center gap-2"
          onClick={createPaste}
        >
          <FiPlus className="text-lg" /> {/* 🧲 Icon left of text */}
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      <div className="mt-6">
        <textarea
          className="w-full border-2 rounded-2xl mt-4 p-4 font-normal min-h-[300px] resize-y"
          value={value}
          placeholder="Enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
