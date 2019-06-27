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

    //var data = request.get('https://cors-anywhere.herokuapp.com/https://air.jl5.technology/data/export-day?sensor_id=121')
    return new Promise(resolve => {

      let temp;
      var data = request.get('  https://air.jl5.technology//data/get-data?sensor_id=124&start=1550487267000&end=1550746129000&asd=0.19944643446510346&callback=jQuery33106081911132130127_1561569989695&_=1561569989707')
      data.then(res => {
        let tempPos = res.text.indexOf("1575630000000,")
        temp = res.text.substring(tempPos+14);
        resolve(parseFloat(temp));
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
