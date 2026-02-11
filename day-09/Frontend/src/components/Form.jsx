const Form = ({ handleSubmit }) => {
  return (
    <form
      className="noteForm"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <input
        className="tittleInput"
        type="text"
        name="tittle"
        required
        placeholder="enter tittle"
      />
      <input
        className="descriptionInput"
        type="text"
        name="description"
        placeholder="enter description"
        required
      />
      <button className="createBtn">Create Note</button>
    </form>
  );
};

export default Form;
