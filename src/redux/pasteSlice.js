// pasteSlice.js
import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: 'pastes',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;

      const title = paste.title?.toString().trim();
      const content = paste.content?.toString().trim();

      if (!title || !content) {
        toast.error("Title and content cannot be blank");
        return;
      }

      const storedPastes = localStorage.getItem("pastes");
      const parsedPastes = storedPastes ? JSON.parse(storedPastes) : [];

      const isDuplicate = parsedPastes.some(
        (p) => p.title?.toString().trim().toLowerCase() === title.toLowerCase()
      );

      if (isDuplicate) {
        toast.error("Paste with this title already exists. Create a new one.");
        return;
      }

      const newPaste = { ...paste, title: title, content: content };
      state.pastes.push(newPaste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste created successfully");
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);
      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("paste updated");
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteId);
      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("paste deleted");
      }
    },
  },
});

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions;

export default pasteSlice.reducer;
