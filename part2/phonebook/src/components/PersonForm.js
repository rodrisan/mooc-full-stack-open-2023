import Button from "./Button";

const PersonForm = (props) => {
  const {
    addPerson,
    newName,
    newPhoneNumber,
    handleNewName,
    handleNewPhoneNumber,
  } = props;
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        number:
        <input value={newPhoneNumber} onChange={handleNewPhoneNumber} />
      </div>
      <Button />
    </form>
  );
};

export default PersonForm;
