import React, { useEffect, useState } from "react";
import axios from "axios";

import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
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
      const newPersons = persons.concat(personObject);
      setPersons(newPersons);
      setFilteredPersons(newPersons);
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

  useEffect(() => {
    axios.get("http://localhost:3003/persons").then((response) => {
      setPersons(response.data);
      setFilteredPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterPersons={filterPersons} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newPhoneNumber={newPhoneNumber}
        handleNewName={handleNewName}
        handleNewPhoneNumber={handleNewPhoneNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
