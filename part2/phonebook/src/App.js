import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const NOT_EXISTS = -1;

  const addPerson = (event) => {
    event.preventDefault();
    if (!personExists()) {
      const personObject = {
        name: newName,
        id: persons.length + 1,
      };

      setPersons(persons.concat(personObject));
      setNewName("");
    }
  };

  const personExists = () => {
    if (findPerson(newName) !== NOT_EXISTS) {
      alert(`${newName} is already added to phonebook`);
      return true;
    }
    return false;
  };

  const findPerson = (name) => {
    return persons.findIndex((person) => person.name === name);
  };

  const handlePersonChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <p key={`${person.name}${index}`}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
