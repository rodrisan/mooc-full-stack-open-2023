import Record from "./Record";

const Persons = ({ persons }) => {
  return persons.map((person, index) => (
    <Record key={`${person.name}${index}`} person={person} />
  ));
};

export default Persons;
