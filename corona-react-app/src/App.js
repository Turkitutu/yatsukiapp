import "./App.css";
import Footer from "./Footer";
import Cases from "./imgs/cases.png";
import Active from "./imgs/active.png";
import Deaths from "./imgs/deaths.png";
import Recovered from "./imgs/recovered.png";
import Tunisia from "./imgs/tunisia.svg";

import { useState, useEffect } from "react";
import axios from "axios";

const formatNumber = (n) => {
  if (n) return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return "";
};

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Tunisia");
  const [data, setData] = useState({ data: { Tunisia: {}, World: {} } });
  const [countryData, setCountryData] = useState({});
  const [worldData, setWorldData] = useState({});

  useEffect(() => {
    axios.get("/api/corona/countries").then((res) => {
      setCountries(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/api/corona/").then((res) => {
      setData(res.data);
      setCountryData(data.data[country]);
      setWorldData(data.data["World"]);
    });
  }, [country, data.data]);

  const handleSelectChange = (e) => {
    setCountry(e.target.value);
  };

  return (
    <>
      <div className="jumbotron bg-white">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <h1>Corona News :</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>Those are the news about coronavirus.</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h4 className="text-primary">The world :</h4>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                <img
                  src={Cases}
                  alt="cases"
                  width="30px"
                  height="30px"
                  className="mr-1"
                />
                Cases :
                <span className="text-primary ml-1">
                  {formatNumber(worldData["cases"])}
                </span>
                {worldData["casesToday"] > 0 ? (
                  <span className="badge badge-warning text-light ml-1">
                    {formatNumber(worldData["casesToday"])} new
                  </span>
                ) : (
                  <></>
                )}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                <img
                  src={Active}
                  alt="active"
                  width="30px"
                  height="30px"
                  className="mr-1"
                />
                Active Cases :
                <span className="text-warning ml-1">
                  {formatNumber(worldData["active"])}
                </span>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                <img
                  src={Deaths}
                  alt="deaths"
                  width="30px"
                  height="30px"
                  className="mr-1"
                />
                Deaths :
                <span className="text-danger ml-1">
                  {formatNumber(worldData["deaths"])}
                </span>
                {worldData["deathsToday"] > 0 ? (
                  <span className="badge badge-danger text-light ml-1">
                    {formatNumber(worldData["deathsToday"])} new
                  </span>
                ) : (
                  <></>
                )}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                <img
                  src={Recovered}
                  alt="recovered"
                  width="30px"
                  height="30px"
                  className="mr-1"
                />
                Recovered :
                <span className="text-success ml-1">
                  {formatNumber(worldData["recovered"])}
                </span>
                {worldData["recoveredToday"] > 0 ? (
                  <span className="badge badge-success text-light ml-1">
                    {formatNumber(worldData["recoveredToday"])} new
                  </span>
                ) : (
                  <></>
                )}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h4 className="text-primary">Country : </h4>
              <div className="form-inline">
                <div className="form-group col-md-2 my-3 ml-0">
                  <div className="d-flex">
                    {country === "Tunisia" ? (
                      <img
                        src={Tunisia}
                        alt="tunisia"
                        width="40"
                        className="mr-2 ml-0"
                      />
                    ) : (
                      <></>
                    )}

                    <select
                      onChange={handleSelectChange}
                      id="countriesSelect"
                      className="form-control"
                    >
                      {countries.map((c) => {
                        if (c === country)
                          return <option selected>{country}</option>;
                        else return <option>{c}</option>;
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                <img
                  src={Cases}
                  alt="cases"
                  width="30px"
                  height="30px"
                  className="mr-1"
                />
                Cases :
                <span className="text-primary ml-1">
                  {countryData["cases"]
                    ? formatNumber(countryData["cases"])
                    : "N/A"}
                </span>
                {countryData["casesToday"] > 0 ? (
                  <span className="badge badge-warning text-light">
                    {countryData["casesToday"]
                      ? formatNumber(countryData["casesToday"])
                      : "N/A"}{" "}
                    new
                  </span>
                ) : (
                  <></>
                )}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                <img
                  src={Active}
                  alt="active"
                  width="30px"
                  height="30px"
                  className="mr-1"
                />
                Active Cases :
                <span className="text-warning ml-1">
                  {countryData["active"]
                    ? formatNumber(countryData["active"])
                    : "N/A"}
                </span>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                <img
                  src={Deaths}
                  alt="deaths"
                  width="30px"
                  height="30px"
                  className="mr-1"
                />
                Deaths :
                <span className="text-danger mr-1 ml-1">
                  {countryData["deaths"]
                    ? formatNumber(countryData["deaths"])
                    : "N/A"}
                </span>
                {countryData["deathsToday"] > 0 ? (
                  <span className="badge badge-danger">
                    {formatNumber(countryData["deathsToday"])} new
                  </span>
                ) : (
                  <></>
                )}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                <img
                  src={Recovered}
                  alt="recovered"
                  width="30px"
                  height="30px"
                  className="mr-1"
                />
                Recovered :
                <span className="text-success mr-1 ml-1">
                  {countryData["recovered"]
                    ? formatNumber(countryData["recovered"])
                    : "N/A"}
                </span>
                {countryData["recoveredToday"] > 0 ? (
                  <span className="badge badge-success">
                    {formatNumber(countryData["recoveredToday"])} new
                  </span>
                ) : (
                  <></>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
