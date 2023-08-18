const Filter = (props) => (
  <form>
    <div>
      Filter shown with: <input onChange={props.filterPersons} />
    </div>
  </form>
);

export default Filter;
