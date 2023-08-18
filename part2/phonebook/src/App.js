import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [filteredPersons, setFilteredPersons] = useState([...persons]);
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

  const filterPersons = (event) => {
    const name = event.target.value.toLowerCase();
    setFilteredPersons(
      persons.filter((person) => person.name.toLowerCase().includes(name))
    );
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
      <form>
        <div>
          Filter shown with: <input onChange={filterPersons} />
        </div>
      </form>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number:
          <input
            type="tel"
            value={newPhoneNumber}
            onChange={handleNewPhoneNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((person, index) => (
        <p key={`${person.name}${index}`}>
          {person.name} {person.phoneNumber}
        </p>
      ))}
    </div>
  );
};

export default App;
