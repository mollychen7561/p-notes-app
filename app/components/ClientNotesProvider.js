"use client";
import { NotesProvider } from "./NotesContext";

// Due to use Next.js
// Use dynamic imports in the component to ensure it only renders on the client side
export default function ClientNotesProvider({ children }) {
  return <NotesProvider>{children}</NotesProvider>;
}
