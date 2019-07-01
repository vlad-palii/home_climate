import React, { useState, useEffect }  from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import request from 'superagent'
import './App.css';

function App() {

  let [leafType, setLeafType] = useState("health-leaf");
  let [co2Level, setCo2Level] = useState("0.5");
  let [indexDescription, setIndexDescription] = useState("Processing..."); 

  useEffect(() => {
    let result;
    let aqi;
    async function getLevel (){
      result = await getO2Level()
      aqi = JSON.parse(result.text).data.current.pollution.aqius;
      setCo2Level(aqi);
      
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

    getLevel();
     
  });

  function getO2Level () {

    return new Promise(resolve => {

      request.get("http://api.airvisual.com/v2/city?city=kyiv&state=Kyiv&country=Ukraine&key=")
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
          <h1 className="main-counter">{co2Level}</h1><h4>air quality index</h4><br/>
          <p className="sensor-description">{`${indexDescription}`}</p>
        </div>
      </Col>
    </Row>
  </Container>
  );
}

export default App;
