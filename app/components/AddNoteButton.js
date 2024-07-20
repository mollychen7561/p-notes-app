"use client";

import { useContext } from "react";
// import { Button } from "flowbite-react";
import { NotesContext } from "./NotesContext";
import { FaPlus } from "react-icons/fa";

const defaultColor = "#CCCCCC";

export default function AddNoteButton({ tabId }) {
  const { addNote } = useContext(NotesContext);

  const handleAddNote = () => {
    addNote(tabId, defaultColor);
  };

  return (
    <div className="flex ">
      <button
        onClick={handleAddNote}
        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
      >
        <FaPlus />
      </button>
    </div>
  );
}
