import { useEffect, useState } from "react";
import axios from "axios";
import NoteCard from "./components/NoteCard";
import NoteUpdateForm from "./components/NoteUpdateForm";
import Form from "./components/Form";

const App = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedNote, setSelectedNote] = useState("");

  function fetchNotes() {
    axios.get("https://day-09.up.railway.app/api/notes").then((res) => {
      setData(res.data.notes);
    });
  }

  function createNote(tittle, description) {
    axios
      .post("https://day-09.up.railway.app/api/notes", {
        tittle,
        description,
      })
      .then(() => {
        fetchNotes();
      });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const { tittle, description } = e.target;
    createNote(tittle.value, description.value);
  }

  function handleDelete(id) {
    axios.delete("https://day-09.up.railway.app/api/note/" + id).then(() => {
      fetchNotes();
    });
  }

  function handleShow() {
    setShow(!show);
  }

  return (
    <>
      {show ? (
        <NoteUpdateForm
          handleShow={handleShow}
          fetchNotes={fetchNotes}
          note={selectedNote}
        />
      ) : (
        ""
      )}
      <Form handleSubmit={handleSubmit} />
      <div className="notes">
        {data.map((note, idx) => {
          return (
            <div key={idx}>
              <NoteCard
                note={note}
                handleDelete={handleDelete}
                onEdit={(note) => {
                  setSelectedNote(note);
                  handleShow();
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
