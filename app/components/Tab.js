import { useContext } from "react";
import { NotesContext } from "./NotesContext";
import Note from "./Note";
import AddNoteButton from "./AddNoteButton";
import { FaPlus } from "react-icons/fa";

const TabsContainer = () => {
  const { tabs, addTab } = useContext(NotesContext);

  return (
    <div className="grid grid-flow-col gap-4">
      {tabs.map((tab) => (
        <Tab key={tab.id} tab={tab} />
      ))}
      <AddTabButton addTab={addTab} />
    </div>
  );
};

const Tab = ({ tab }) => {
  return (
    <div className="w-64 rounded-lg">
      <div className="inline flex justify-between p-4 border-l-4 border-violet-400 bg-violet-100">
        <h3 className="text-xl font-bold">{tab.name}</h3>
        <AddNoteButton tabId={tab.id} />
      </div>
      <div className="pt-4">
        <div className="grid grid-cols-1 gap-4">
          {tab.notes
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

const AddTabButton = ({ addTab }) => {
  return (
    <div className="w-16 flex items-start justify-center">
      <button
        onClick={addTab}
        className="p-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
