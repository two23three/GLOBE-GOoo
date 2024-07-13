import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LocationList from "./LocationList";
import LocationDetails from './LocationDetails';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Globe GO</h1>
        <Switch>
          <Route path="/" exact component={LocationList} />
          <Route path="/location/:id" component={LocationDetails} />
        </Switch>
      </div>
    </Router>
  );
};

export default App