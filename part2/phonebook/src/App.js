import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const NOT_EXISTS = -1;

  const addPerson = (event) => {
    event.preventDefault();
    if (!personExists()) {
      const personObject = {
        name: newName,
        phoneNumber: newPhoneNumber,
        id: persons.length + 1,
      };

      setPersons(persons.concat(personObject));
      setNewName("");
      setNewPhoneNumber("");
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

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPhoneNumber = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number:{" "}
          <input type="tel" value={newPhoneNumber} onChange={handleNewPhoneNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <p key={`${person.name}${index}`}>{person.name} {person.phoneNumber}</p>
      ))}
    </div>
  );
};

export default App;
