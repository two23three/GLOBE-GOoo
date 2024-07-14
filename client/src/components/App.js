import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LocationList from './LocationList';
import LocationDetails from './LocationDetails';
import Navbar from './Navbar';
import AuthForm from './AuthForm';
import PrivateRoute from './PrivateRoute';
import './App.css'; 

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Switch>
          <Route path="/" exact component={AuthForm} />
          <PrivateRoute path="/locations" exact component={LocationList} />
          <PrivateRoute path="/location/:id" component={LocationDetails} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
