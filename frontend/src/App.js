import React, { useState, useEffect }  from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import request from 'superagent'
import './App.css';
import Home from './components/homeComponent'

function App() {

  return (

    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#"></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink exact className="nav-link" activeClassName="active" to="/">CV</NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact className="nav-link" activeClassName="active" to="/air-quality-pet">Air Quality Pet</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    
    <Route exact path="/" component={Home} />
    <Route exact path="/air-quality-pet" component={AirQuality} />
  </Router>

  );
}

export default App;

export function AirQuality () {

  let [leafType, setLeafType] = useState("health-leaf");
  let [airVisualData, setAirVisualData] = useState("0");
  let [waqiData, setWaqiData] = useState("0");
  let [indexDescription, setIndexDescription] = useState("Processing..."); 
  let [currentPosition, setCurrentPosition] = useState("Detecting position...");

  function setDescriptionByCO2(co2Level) {
    if(co2Level > 0 < 50) {
      setIndexDescription("Good")
    }
    else if (co2Level > 51 < 100) {
      setIndexDescription("Normal")
    }
    else if(co2Level > 101 < 150) {
      setIndexDescription("Unhealthy")
      setLeafType("sick-leaf")
    }
    else if(co2Level > 151) {
      setIndexDescription("DANGER")
      setLeafType("dead-leaf")
    }
  }

  useEffect(() => {
    
    let airVisualResult = {}
    let waqiResult = {}

    let api =  [airVisualResult, waqiResult];

    async function getAllData (){

      api = [await getO2Level(), await getWaqiData()];
      
      setAirVisualData(JSON.parse(api[0].text).data.current.pollution.aqius);
      setWaqiData(JSON.parse(api[1].text).data.aqi);
      setDescriptionByCO2(JSON.parse(api[0].text).data.current.pollution.aqius); 
    }

    getAllData();

    function getCurrentPosition(options = {}) {
      return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    };

    let fetchCoordinates = async () => {
      try {
          let { coords } = await getCurrentPosition();
          let { latitude, longitude } = coords;

          // Handle coordinates
          setCurrentPosition([latitude.toFixed(3), longitude.toFixed(3)].join(", "))

      } catch (error) {
          // Handle error
          console.error(error);
      }
  };

  fetchCoordinates();

  });

  function getO2Level () {

    return new Promise(resolve => {
      //37bff4af-0639-4402-a226-e188eb44984e - new key
      request.get("http://api.airvisual.com/v2/city?city=kyiv&state=Kyiv&country=Ukraine&key=37bff4af-0639-4402-a226-e188eb44984e")
      .then(res => {
        resolve(res);
      })

    });

  }

  function getWaqiData () {

    return new Promise(resolve => {
      //waqi token = ed785b8620760c78d6723bc2f920080be62fa297
      request.get("https://api.waqi.info/feed/kiev/?token=ed785b8620760c78d6723bc2f920080be62fa297")
      .then(res => {
        resolve(res);
      })

    });

  }

  return (
    <Container>
    <Row>
    <Col className={`card background-image-card ${leafType}`}>
        <div className="sensor-info">
          <h1 className="main-counter">{airVisualData} of 500</h1><h4>Air Visual AQI</h4><br/>
          <h1 className="main-counter">{waqiData} of 500</h1><h4>WAQI</h4><br/>
          <p className="sensor-description">{`${indexDescription}`}</p>
        </div>

        <h3>{ `${currentPosition}` }</h3>
      </Col>
    </Row>
  </Container>
  )
}
