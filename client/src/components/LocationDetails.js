import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const LocationDetails = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    fetch(`/traveler/locations/${id}`)
      .then(response => response.json())
      .then(data => setLocation(data))
      .catch(error => console.error('Error fetching location details:', error));
  }, [id]);

  useEffect(() => {
    fetch('/traveler/tickets')
      .then(response => response.json())
      .then(data => setTickets(data))
      .catch(error => console.error('Error fetching tickets:', error));
  }, []);

  const buyTicket = async () => {
    if (!selectedTicket) {
      alert("Please select a ticket to buy.");
      return;
    }

    const ticketData = { ticket_id: selectedTicket };
    const jwtToken = localStorage.getItem('jwt_token');

    if (!jwtToken) {
      alert("JWT token is missing. Please log in again.");
      return;
    }

    console.log('JWT Token:', jwtToken);

    try {
      const response = await fetch('/traveler/buy_ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}` 
        },
        body: JSON.stringify(ticketData)
      });

      const data = await response.json();
      console.log('Response:', data);

      if (response.ok) {
        alert(data.message);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error buying ticket:', error);
    }
  };

  if (!location) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{location.name}</h2>
      <p>{location.description}</p>
      <h3>Available Tickets</h3>
      <select onChange={(e) => setSelectedTicket(e.target.value)}>
        <option value="">Select a ticket</option>
        {tickets.map(ticket => (
          <option key={ticket.id} value={ticket.id}>
            {`Ticket ID: ${ticket.id}, Price: ${ticket.price}, Means: ${ticket.means}, Seat No: ${ticket.seat_no}`}
          </option>
        ))}
      </select>
      <button onClick={buyTicket}>Buy Ticket</button>
    </div>
  );
};

export default LocationDetails;