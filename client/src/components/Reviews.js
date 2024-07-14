import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const token = localStorage.getItem('jwt_token');
        if (!token) {
          console.error('User is not authenticated');
          return;
        }

        const response = await axios.get('/traveler/user_reviews', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setReviews(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user reviews:', error);
        setLoading(false);
      }
    };

    fetchUserReviews();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Your Reviews</h2>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <p>Rating: {review.rating}</p>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews found</p>
      )}
    </div>
  );
};

export default UserReviews;
