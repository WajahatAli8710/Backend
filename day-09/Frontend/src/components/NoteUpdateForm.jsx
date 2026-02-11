import axios from "axios";

const noteUpdateForm = ({ note, handleShow, fetchNotes }) => {
  function handleUpdateNote(e) {
    e.preventDefault();

    const tittle = e.target.updateTittle.value;
    const description = e.target.updateDescription.value;
    axios
      .patch("http://localhost:3000/api/note/" + note._id, {
        tittle: tittle,
        description: description,
      })
      .then(() => {
        fetchNotes();
      });
  }

  return (
    <form
      className="updateForm"
      onSubmit={(e) => {
        console.log("lllloo");
        handleUpdateNote(e);
        handleShow();
      }}
    >
      <input
        className="updateInput"
        type="text"
        name="updateTittle"
        placeholder="enter tittle"
        required
      />
      <input
        className="updateInput"
        type="text"
        name="updateDescription"
        placeholder="enter tittle"
        required
      />
      <button className="updateBtn">Update Note</button>
    </form>
  );
};

export default noteUpdateForm;
