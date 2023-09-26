import React from "react";

const PersonFilter = (props) => {
  return (
    <div className="c-filter">      
      <div className="c-form-row">
      <label >
            filter shown with 
          </label>
        <input
          id="filter"
          className="c-form-row__input"
          onChange={props.handleFilterChange}
          value={props.value}
          placeholder="Enter name..."
        />
      </div>
    </div>
  );
};

export default PersonFilter;
