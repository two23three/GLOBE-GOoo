// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LocationList from './LocationList';
import LocationDetails from './LocationDetails';
import Navbar from './Navbar';
import './App.css'; 
const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Switch>
          <Route path="/" exact component={LocationList} />
          <Route path="/location/:id" component={LocationDetails} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
