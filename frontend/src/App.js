import React, { useState, useEffect }  from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import request from 'superagent'
import './App.css';

function App() {

  let [leafType, setLeafType] = useState("health-leaf");
  let [co2Level, setCo2Level] = useState("Loading data...");
  //let [leafType, setLeafType] = useState("sick-leaf");
  //let [leafType, setLeafType] = useState("dead-leaf");
  // 0.035 - huge level of air pollution!!!!!! for co2 sensor
  // 02 level is --- 

  useEffect(() => {

    async function getLevel (){
      setCo2Level(await getO2Level());
      //console.log(result)
    }

    getLevel();
     
  });

  function getO2Level () {

    return new Promise(resolve => {

      // GET Get nearest station data (GPS coodinates)
      // api.airvisual.com/v2/nearest_station?lat={{LATITUDE}}&lon={{LONGITUDE}}&key={{YOUR_API_KEY}}

      var data = request.get('" api.airvisual.com/v2/nearest_station?lat=30.45&lon=30.51&key={{YOUR_API_KEY}}"');
      data.then(res => {
        console.log(res);
        resolve();
      })

    });

  }

  return (
    <Container>
    <Row>
    <Col className={`card background-image-card ${leafType}`}>
        <div className="sensor-info">
          <h1 className="main-counter">{co2Level}</h1><h4>CO2 mg/m3</h4><br/> 
          {/* <h1 className="main-counter">21.03</h1><h4>O2 mg/m3</h4> */}
        </div>
      </Col>
    </Row>
  </Container>
  );
}

export default App;
