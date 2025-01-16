import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateArea = ({ onAdd, search, setSearch, isEditing, editNoteData }) => {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setAllNotes(storedNotes);
  }, []);

  useEffect(() => {
    if (isEditing) {
      setNote(editNoteData);
    }
  }, [isEditing, editNoteData]);

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  const isDuplicateTitle = (title) => {
    for (let i = 0; i < allNotes.length; i++) {
      if (isEditing && allNotes[i].title === editNoteData.title) {
        continue;
      }
      if (allNotes[i].title.toLowerCase() === title.toLowerCase()) {
        return true;
      }
    }
    return false;
  };

  const submitNote = (e) => {
    e.preventDefault();

    // Check for empty fields
    if (note.title.trim() === "" || note.content.trim() === "") {
      toast.error("Title and content cannot be empty.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (!isEditing || note.title !== editNoteData.title) {
      if (isDuplicateTitle(note.title)) {
        toast.error("A note with this title already exists.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
    }

    onAdd(note);
    setNote({ title: "", content: "" });
    toast.success("Note added successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={0} sm={2} md={3} lg={4}></Grid>

        <Grid item xs={12} sm={8} md={6} lg={4}>
          <form className="create-note">
            <input
              name="title"
              onChange={handleChange}
              value={note.title}
              placeholder="Title"
            />
            <textarea
              name="content"
              onChange={handleChange}
              value={note.content}
              placeholder="Take a note..."
              rows={3}
            />
            <Fab onClick={submitNote}>
              <AddIcon />
            </Fab>
          </form>
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={4} className="search">
          <div>
            <Input
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </Grid>
      </Grid>
      <ToastContainer />
    </div>
  );
};

export default CreateArea;
