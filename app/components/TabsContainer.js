import { useContext, useState } from "react";
import { NotesContext } from "./NotesContext";
import Note from "./Note";
import AddNoteButton from "./AddNoteButton";
import { FaPlus, FaEllipsisV } from "react-icons/fa";
import { Popover } from "flowbite-react";

// Define the TabsContainer component
const TabsContainer = () => {
  const { tabs, addTab, searchTerm } = useContext(NotesContext);

  return (
    <div className="grid grid-flow-col gap-6">
      {tabs.map((tab) => (
        <Tab key={tab.id} tab={tab} searchTerm={searchTerm} />
      ))}
      <AddTabButton addTab={addTab} />
    </div>
  );
};

// Component to display a single tab and its notes
const Tab = ({ tab, searchTerm }) => {
  const { deleteTab, updateTabName } = useContext(NotesContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newTabName, setNewTabName] = useState(tab.name);

  const handleUpdateTabName = () => {
    updateTabName(tab.id, newTabName);
    setIsEditing(false);
  };

  // Filter the notes in the tab based on the search term
  const filteredNotes = tab.notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-64 rounded-lg">
      <div className="inline flex justify-between p-4 border-l-4 border-violet-400 bg-violet-100">
        {isEditing ? (
          <input
            value={newTabName}
            onChange={(e) => setNewTabName(e.target.value)}
            onBlur={handleUpdateTabName}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleUpdateTabName();
            }}
            autoFocus
            className="border p-1 rounded"
          />
        ) : (
          <h3 className="text-xl font-bold">{tab.name}</h3>
        )}
        <div className="flex items-center">
          <AddNoteButton tabId={tab.id} />
          <Popover
            aria-labelledby="tab-options"
            content={
              <div className="w-32 text-sm text-gray-500 dark:text-gray-400">
                <div
                  className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 cursor-pointer"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Tab Name
                </div>
                <div
                  className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 cursor-pointer"
                  onClick={() => deleteTab(tab.id)}
                >
                  Delete Tab
                </div>
              </div>
            }
          >
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <FaEllipsisV />
            </button>
          </Popover>
        </div>
      </div>
      <div className="pt-4">
        <div className="grid grid-cols-1 gap-2">
          {filteredNotes
            .slice()
            .reverse()
            .map((note) => (
              <div className="col-span-1" key={note.id}>
                <Note tabId={tab.id} note={note} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

// Component to add a new tab
const AddTabButton = ({ addTab }) => {
  return (
    <div className="w-16 flex items-start justify-center">
      <button
        onClick={addTab}
        className="p-4 text-gray-400 hover:text-violet-400 dark:hover:text-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default TabsContainer;
