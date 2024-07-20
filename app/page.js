"use client";

import { NotesProvider } from "./components/NotesContext";
import SearchBar from "./components/SearchBar";
import Tab from "./components/Tab";

export default function HomePage() {
  return (
    <NotesProvider>
      <div className="grid grid-cols-4 gap-4 p-12">
        <div className="col-span-2">
          <h1 className="text-2xl font-bold">NOTES</h1>
        </div>
        <div className="col-span-2">
          <SearchBar />
        </div>
        <div className="col-span-1">
          <Tab />
        </div>
      </div>
    </NotesProvider>
  );
}
