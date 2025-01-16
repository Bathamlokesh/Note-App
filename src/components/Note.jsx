import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";

const Note = ({ notes, search, onDelete, onEdit }) => {
  const handleDelete = (id) => {
    onDelete(id);
  };

  const handleEdit = (id) => {
    onEdit(id);
  };

  // Filter notes based on the search query
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="notes-container">
      <Grid container spacing={3}>
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <div className="note">
                <h1>{note.title}</h1>
                <p>{note.content}</p>
                <div>
                <button className="btn-b" onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </button>
                <button className="btn-b" onClick={() => handleEdit(index)}>
                  <EditIcon />
                </button>
                </div>
              </div>
            </Grid>
          ))
        ) : (
          <Grid item xs={12} className="empty-message">
            <p className="">
              {search.trim()
                ? "No notes match your search."
                : "No notes available. Start by adding a new note!"}
            </p>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Note;
