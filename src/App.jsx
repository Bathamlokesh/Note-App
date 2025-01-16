import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  const [editNoteId, setEditNoteId] = useState(null);
  const [editNoteData, setEditNoteData] = useState({ title: "", content: "" });
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  const addNote = (newNote) => {
    if (editNoteId !== null) {
      setNotes((prevNotes) => {
        const updatedNotes = prevNotes.map((note, index) =>
          index === editNoteId ? newNote : note
        );
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        return updatedNotes;
      });
      setEditNoteId(null);
      setEditNoteData({ title: "", content: "" });
    } else {
      setNotes((prevNotes) => {
        const updatedNotes = [...prevNotes, newNote];
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        return updatedNotes;
      });
    }
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter((note, index) => index !== id);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

  const editNote = (id) => {
    setEditNoteId(id);
    setEditNoteData(notes[id]);
  };

  return (
    <div>
      <Header />
      <CreateArea
        search={search}
        setSearch={setSearch}
        onAdd={addNote}
        editNoteData={editNoteData}
        isEditing={editNoteId !== null}
      />
      <Note
        search={search}
        notes={notes}
        onDelete={deleteNote}
        onEdit={editNote}
      />
    </div>
  );
}

export default App;
