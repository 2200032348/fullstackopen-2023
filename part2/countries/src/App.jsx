import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");
  const [hasFilter, setHasFilter] = useState(false);
  // const key = process.env.REACT_APP_OPENWEATHERMAP_KEY || null;
  // console.log(key);
  const fetchCountries = () => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      setCountries(response.data);
    });
  };

  useEffect(fetchCountries, []);

  const filteredCountries = countries.filter((country) => {
    // console.log(country.name.common)
    return country.name.toLowerCase().includes(countryFilter.toLowerCase());
  });

  const hasExactMatch = filteredCountries.some((country) => {
    return country.name.toLowerCase() === countryFilter.toLowerCase();
  });

  let exactFilteredCountries;
  if (hasExactMatch) {
    exactFilteredCountries = filteredCountries.filter((country) => {
      return country.name.toLowerCase() === countryFilter.toLowerCase();
    });
  }

  const handleChange = (event) => {
    setCountryFilter(event.target.value);

    if (event.target.value === "") setHasFilter(false);
    else setHasFilter(true);
  };

  const handleCountryClick = (event) => {
    setCountryFilter(event.target.id);
  };

  return (
    <div>
      <h1>Data For Countries</h1>
      <Filter onChange={(event) => handleChange(event)} value={countryFilter} />
      {hasFilter && hasExactMatch && (
        <Countries countries={exactFilteredCountries} />
      )}
      {hasFilter && !hasExactMatch && (
        <Countries
          countries={filteredCountries}
          handleCountryClick={(event) => handleCountryClick(event)}
        />
      )}
    </div>
  );
}

export default App;
