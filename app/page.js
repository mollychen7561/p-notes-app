"use client";

import { NotesProvider } from "./components/NotesContext";
import HomePageContent from "./components/HomePageCotent";
import dynamic from "next/dynamic";

const ClientNotesProvider = dynamic(
  () => import("./components/ClientNotesProvider"),
  {
    ssr: false
  }
);

export default function HomePage() {
  return (
    <ClientNotesProvider>
      <NotesProvider>
        <HomePageContent />
      </NotesProvider>
    </ClientNotesProvider>
  );
}
