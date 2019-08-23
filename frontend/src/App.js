import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import './App.scss';
import Home from './components/homeComponent'
import AirQuality from './components/airQulityComponent'

export default function App() {

  return (
    <div id="app" className="synthwave-i">
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-header-synthwave">
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

    </div>
  );
}