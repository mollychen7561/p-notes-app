"use client";

import { createContext, useState, useEffect } from "react";

// Create a new context for managing notes
export const NotesContext = createContext();

// Define the NotesProvider component
export const NotesProvider = ({ children }) => {
  // Initialize the state with saved tabs from localStorage or default tab
  const [tabs, setTabs] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTabs = localStorage.getItem("notes-tabs");
      return savedTabs
        ? JSON.parse(savedTabs)
        : [{ id: 1, name: "Work", notes: [] }];
    }
    return [{ id: 1, name: "Work", notes: [] }];
  });

  // Save tabs to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("notes-tabs", JSON.stringify(tabs));
    }
  }, [tabs]);

  // Function to add a new note to a specific tab
  const addNote = (tabId, theme) => {
    const newTabs = tabs.map((tab) =>
      tab.id === tabId
        ? {
            ...tab,
            notes: [
              ...tab.notes,
              {
                id: Date.now(),
                text: "",
                theme,
                timestamp: Date.now(),
                editmode: true
              }
            ]
          }
        : tab
    );
    setTabs(newTabs);
  };

  // Function to save changes to a specific note
  const saveNote = (tabId, noteId, text) => {
    console.log("Saving note:", { tabId, noteId, text });
    const newTabs = tabs.map((tab) =>
      tab.id === tabId
        ? {
            ...tab,
            notes: tab.notes.map((note) =>
              note.id === noteId ? { ...note, text, editmode: false } : note
            )
          }
        : tab
    );
    setTabs(newTabs);
  };

  // Function to delete a specific note
  const deleteNote = (tabId, noteId) => {
    const newTabs = tabs.map((tab) =>
      tab.id === tabId
        ? { ...tab, notes: tab.notes.filter((note) => note.id !== noteId) }
        : tab
    );
    setTabs(newTabs);
  };

  // Function to update the color theme of a specific note
  const updateNoteColor = (tabId, noteId, color) => {
    console.log("Updating note color:", { tabId, noteId, color });
    const newTabs = tabs.map((tab) =>
      tab.id === tabId
        ? {
            ...tab,
            notes: tab.notes.map((note) =>
              note.id === noteId ? { ...note, theme: color } : note
            )
          }
        : tab
    );
    setTabs(newTabs);
  };

  // Function to add a new tab
  const addTab = () => {
    const newTab = {
      id: Date.now(),
      name: `New Tab`,
      notes: []
    };
    setTabs([...tabs, newTab]);
  };

  // Function to delete a tab
  const deleteTab = (tabId) => {
    const newTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(newTabs);
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
        addTab,
        deleteTab
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
