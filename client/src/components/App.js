import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import LocationList from './LocationList';  // Corrected path
import LocationDetails from './LocationDetails';  // Corrected path

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <LocationList />
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/location/:id" component={LocationDetails} />
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h2>Welcome to the Location App</h2>
    <p>Select a location from the navbar to view details.</p>
  </div>
);

export default App;
