import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LocationList = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('/traveler/locations')
      .then(response => response.json())
      .then(data => setLocations(data))
      .catch(error => console.error('Error fetching locations:', error));
  }, []);

  return (
    <ul>
      {locations.map(location => (
        <li key={location.id}>
          <Link to={`/location/${location.id}`}>{location.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default LocationList;
