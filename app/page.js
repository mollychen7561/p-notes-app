"use client";

import { NotesProvider } from "./components/NotesContext";
import SearchBar from "./components/SearchBar";
import Tab from "./components/Tab";

export default function HomePage() {
  return (
    <NotesProvider>
      <div className="w-full h-full">
        <div className="grid grid-cols-4 gap-5 p-12">
          <div className="col-span-2">
            <h1 className="text-5xl font-bold tracking-wide bg-white-100">
              NOTES
            </h1>
          </div>
          <div className="col-span-2">
            <SearchBar />
          </div>
          <div className="col-span-1 mt-10">
            <Tab />
          </div>
        </div>
      </div>
    </NotesProvider>
  );
}
