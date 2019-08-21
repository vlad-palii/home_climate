import React, { useState, useEffect }  from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import request from 'superagent'
import './App.css';
import Home from './components/homeComponent'

function App() {

  return (

    <Router>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="">CV</NavLink>
            </li>
            <li class="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/air-quality-pet">Air Quality Pet</NavLink>
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
  // let [co2Level, setCo2Level] = useState("0");
  // let [co2Level, setCo2Level] = useState("0");
  
  let [airVisualData, setAirVisualData] = useState("0");
  let [waqiData, setWaqiData] = useState("0");
  let [indexDescription, setIndexDescription] = useState("Processing..."); 

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
      console.log(JSON.parse(api[1].text).data.aqi); //JSON.parse(result.text).data

    }

    getAllData();

    //async function getLevel (){
      //result = await getO2Level()
      //aqi = JSON.parse(result.text).data.current.pollution.aqius;
      //setCo2Level(aqi);   
      //setDescriptionByCO2(co2Level);
    //}

    //getLevel();
     
  });

  function getO2Level () {

    return new Promise(resolve => {
      //b299f1a9-393a-4774-9e6c-29b7fbb7d051 - first key
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
      </Col>
    </Row>
  </Container>
  )
}
