"use client";

import { createContext, useState } from "react";

// Create a new context for managing notes
export const NotesContext = createContext();

// Define the NotesProvider component
export const NotesProvider = ({ children }) => {
  // Initialize the state with one tab containing an empty array of notes
  const [tabs, setTabs] = useState([{ id: 1, name: "Work", notes: [] }]);

  // notes data, to be used in notes
  // const [notes, setNotes] = useState(() => {
  //   const notes = localStorage.getItem("notes-data");
  //   return notes ? JSON.parse(notes) : [];
  // });

  // Function to add a new note to a specific tab
  const addNote = (tabId, theme) => {
    setTabs(
      tabs.map((tab) =>
        tab.id === tabId
          ? {
              ...tab,
              notes: [
                ...tab.notes,
                {
                  id: Date.now(), // Use the current timestamp as the note ID
                  text: "",
                  theme,
                  timestamp: Date.now(),
                  editmode: true // Set the note to edit mode initially
                }
              ]
            }
          : tab
      )
    );
  };

  // Function to save changes to a specific note
  const saveNote = (tabId, noteId, text) => {
    setTabs(
      tabs.map((tab) =>
        tab.id === tabId
          ? {
              ...tab,
              notes: tab.notes.map((note) =>
                note.id === noteId ? { ...note, text, editmode: false } : note
              )
            }
          : tab
      )
    );
  };

  // Function to delete a specific note
  const deleteNote = (tabId, noteId) => {
    setTabs(
      tabs.map((tab) =>
        tab.id === tabId
          ? { ...tab, notes: tab.notes.filter((note) => note.id !== noteId) }
          : tab
      )
    );
  };

  // Function to update the color theme of a specific note
  const updateNoteColor = (tabId, noteId, color) => {
    setTabs(
      tabs.map((tab) =>
        tab.id === tabId
          ? {
              ...tab,
              notes: tab.notes.map((note) =>
                note.id === noteId ? { ...note, theme: color } : note
              )
            }
          : tab
      )
    );
  };

  // Function to add a new tab
  const addTab = () => {
    const newTab = {
      id: tabs.length + 1, // Use the next available ID
      name: `New Tab`,
      notes: []
    };
    setTabs([...tabs, newTab]);
  };

  // Provide the NotesContext value with the necessary functions and state
  return (
    <NotesContext.Provider
      value={{
        tabs,
        addNote,
        saveNote,
        deleteNote,
        updateNoteColor,
        addTab
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
