const NoteCard = ({ note, handleDelete, onEdit }) => {
  return (
    <div className="note">
      <h2 className="tittle">{note.tittle}</h2>
      <p className="description">{note.description}</p>
      <div className="feacture">
        <button
          className="edit"
          onClick={() => {
            onEdit(note);
          }}
        >
          <i className="ri-pencil-ai-line"></i>
        </button>
        <button
          className="delete"
          onClick={() => {
            handleDelete(note._id);
          }}
        >
          <i className="ri-delete-bin-6-line"></i>
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
