"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { FaEdit, FaRegSave, FaRegTrashAlt, FaPalette } from "react-icons/fa";
import { NotesContext } from "./NotesContext"; // Import the NotesContext
import { Popover } from "flowbite-react"; // Import the Popover component from Flowbite

// Define the available colors for the notes
const colors = ["#F2B5B9", "#F0D9A2", "#BFEAE6", "#DEE8F4", "#D1CCF5"];

// Define the Note component
export default function Note({ note }) {
  // Get the necessary functions and state from the NotesContext
  const { saveNote, deleteNote, updateNoteColor } = useContext(NotesContext);

  // State variables
  const [isEditMode, setIsEditMode] = useState(note.editmode);
  const [text, setText] = useState(note.text);
  const [selectedColor, setSelectedColor] = useState(note.theme);

  // Ref for the textarea element
  const textareaRef = useRef(null);

  // Function to save the changes made to the note
  const handleSaveNote = () => {
    saveNote(note.id, text);
    setIsEditMode(false);
  };

  // Function to update the color of the note
  const handleColorChange = (color) => {
    updateNoteColor(note.id, color);
    setSelectedColor(color);
  };

  // Function to get the date string in the format "Month Day, Year"
  const getDateString = (timestamp) => {
    const temp = new Date(timestamp).toDateString().split(" ");
    return `${temp[1]} ${temp[2]}, ${temp[3]}`;
  };

  // Function to adjust the height of the textarea element based on its content
  const adjustTextareaHeight = () => {
    textareaRef.current.style.maxHeight = "1px";
    textareaRef.current.style.minHeight = "1px";
    textareaRef.current.style.height = "1px";

    textareaRef.current.style.minHeight =
      Math.max(textareaRef.current.scrollHeight, 100) + "px";

    textareaRef.current.style.height = null;
    textareaRef.current.style.maxHeight = null;
  };

  // Effect to adjust the textarea height when the component mounts or the text state changes
  useEffect(() => {
    adjustTextareaHeight();
  }, [text]);

  // Effect to adjust the textarea height when the window is resized
  useEffect(() => {
    window.addEventListener("resize", adjustTextareaHeight);
    return () => {
      window.removeEventListener("resize", adjustTextareaHeight);
    };
  }, []);

  // Render the Note component
  return (
    <div className="note" style={{ background: selectedColor }}>
      <textarea
        ref={textareaRef}
        readOnly={!isEditMode}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="footer">
        <p className="date">{getDateString(note.timestamp)}</p>
        {!isEditMode && (
          <button onClick={(e) => setIsEditMode(true)}>
            <FaEdit />
          </button>
        )}
        {isEditMode && (
          <button onClick={handleSaveNote}>
            <FaRegSave />
          </button>
        )}
        <button onClick={(e) => deleteNote(note.id)}>
          <FaRegTrashAlt />
        </button>
        <Popover
          aria-labelledby="color-popover"
          content={
            <div className="w-32 text-sm text-gray-500 dark:text-gray-400">
              <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                <div className="colors-input-list flex flex-wrap">
                  {colors.map((color) => (
                    <div className="color-input m-1" key={color}>
                      <button
                        className="w-6 h-6 rounded-full"
                        style={{ background: color }}
                        onClick={() => handleColorChange(color)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
        >
          <button>
            <FaPalette />
          </button>
        </Popover>
      </div>
    </div>
  );
}
