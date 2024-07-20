"use client";

import { useContext } from "react";
import { NotesContext } from "./NotesContext";
import SearchBar from "./SearchBar";
import TabsContainer from "./TabsContainer";

// Place the content of the home page here
// Place NotesProvider in the outermost layer to ensure that all subcomponents can use the context normally
export default function HomePageContent() {
  const { updateSearchTerm, filteredNotes } = useContext(NotesContext);

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-4 gap-5 p-12">
        <div className="col-span-2">
          <a href="#" className="text-5xl font-bold tracking-wide bg-white-100">
            NOTES
          </a>
        </div>
        <div className="col-span-2">
          <SearchBar onSearch={updateSearchTerm} />
        </div>
        <div className="col-span-1 mt-10">
          <TabsContainer />
        </div>
        <div className="col-span-4">
          {/* Display the filtered notes */}
          {/* {filteredNotes.map((note) => (
            <div key={note.id} className="mt-4">
              <h2 className="text-lg font-bold">{note.tabName}</h2>
              <p>{note.text}</p>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}
