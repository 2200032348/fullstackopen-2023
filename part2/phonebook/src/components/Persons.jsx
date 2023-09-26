import React from "react";

const Person = (props) => {
  return (
    <div className="c-person">
      <span className="c-person__detail">
        <span className="u-bold">{props.name} </span>
      </span>
      <span className="c-person__detail">
        <span className="u-italic">{props.number} </span>
      </span>
      <span>      
          <button
            className="c-btn c-btn--danger"
            data-id={props.id}
            onClick={props.handleClick}
          >
            Delete
          </button>       
      </span>
    </div>
  );
};

const Persons = ({ persons, handleClick }) => {
  const personsList = persons.map((person) => {
    return (
      <Person
        key={person.id}
        id={person.id}
        name={person.name}
        number={person.number}
        handleClick={handleClick}
      />
    );
  });

  return (
    <div className="c-persons">
      <h3 className="c-persons__heading">Numbers</h3>
      {personsList}
    </div>
  );
};

export default Persons;
