"use client";
import { NotesProvider } from "./NotesContext";

export default function ClientNotesProvider({ children }) {
  return <NotesProvider>{children}</NotesProvider>;
}
