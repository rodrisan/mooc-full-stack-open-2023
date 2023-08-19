import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState();
  const [countryWeather, setCountryWeather] = useState();
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [findCountry, setFindCountry] = useState("");

  const filterCountries = (event) => {
    const name = event.target.value.toLowerCase();
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(name)
      )
    );
    setCountry();
    setFindCountry(name);
  };

  const showCountry = (commonName) => {
    setFilteredCountries(
      countries.filter((country) => country.name.common === commonName)
    );
  };

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
        setFilteredCountries(response.data);
      })
      .catch(() => {
        axios
          .get("https://studies.cs.helsinki.fi/restcountries/api/all")
          .then((response) => {
            setCountries(response.data);
            setFilteredCountries(response.data);
          });
      });
  }, []);

  const uniqueCountry = filteredCountries.length === 1 && filteredCountries[0];

  useEffect(() => {
    uniqueCountry &&
      axios
        .get(`https://restcountries.com/v3.1/name/${uniqueCountry.name.common}`)
        .then((response) => {
          setCountry(response.data[0]);
        })
        .catch(() => {
          axios
            .get(
              `https://studies.cs.helsinki.fi/restcountries/api/name/${uniqueCountry.name.common}`
            )
            .then((response) => {
              setCountry(response.data);
            });
        });
  }, [uniqueCountry]);

  useEffect(() => {
    const params = {
      access_key: apiKey,
      query: uniqueCountry && uniqueCountry.capital[0],
    };
    uniqueCountry &&
      axios
        .get("http://api.weatherstack.com/current", { params })
        .then((response) => {
          if (!response.data.error) {
            setCountryWeather(response.data);
          } else {
            console.log(
              `Response error: code: ${response.data.error.code}, info: ${response.data.error.info}`
            );
          }
        })
        .catch((error) => {
          console.error("An error occurred: ", error);
        });
  }, [apiKey, uniqueCountry]);

  return (
    <form>
      <div>
        Find countries:
        <input onChange={filterCountries} />
        {findCountry && country && (
          <>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital[0]}</p>
            <p>Population: {country.population}</p>

            <h2>Languages</h2>
            <ul>
              {Object.entries(country.languages).map(([key, value]) => (
                <li key={key}>{value}</li>
              ))}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
          </>
        )}
        {filteredCountries.length > 1 &&
          filteredCountries.length < 10 &&
          filteredCountries.map((country) => {
            return (
              <p key={country.name.common}>
                {country.name.common}
                <button
                  title="Show"
                  onClick={() => showCountry(country.name.common)}
                >
                  Show
                </button>
              </p>
            );
          })}
        {findCountry && !country && filteredCountries.length > 10 && (
          <p>Too many matches, specify another filter</p>
        )}
        {countryWeather && uniqueCountry && (
          <>
            <h1>Weather in {uniqueCountry.capital[0]}</h1>
            <p><b>Temperature:</b> {countryWeather.current.temperature} Celsius</p>
            <img src={countryWeather.current.weather_icons[0]} alt={countryWeather.current.weather_descriptions[0]} />
            <p><b>Wind:</b> {countryWeather.current.wind_speed} mph, direction {countryWeather.current.wind_dir}</p>
          </>
        )}
      </div>
    </form>
  );
}

export default App;
