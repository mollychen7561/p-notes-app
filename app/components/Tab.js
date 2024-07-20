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
    <div className="w-64 border border-gray-300 rounded-lg">
      <div className="inline flex justify-between p-4 border-b">
        <h3 className="text-xl font-bold">{tab.name}</h3>
        <AddNoteButton tabId={tab.id} />
      </div>
      <div className="p-4">
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
    <div className="w-16 flex content-between justify-center">
      <button
        onClick={addTab}
        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default TabsContainer;
