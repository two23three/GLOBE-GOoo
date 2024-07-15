import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editReviewId, setEditReviewId] = useState(null);
  const [editReviewText, setEditReviewText] = useState('');

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

  const updateReview = async (reviewId) => {
    const reviewData = { review_text: editReviewText };
    const jwtToken = localStorage.getItem('jwt_token');

    if (!jwtToken) {
      alert("JWT token is missing. Please log in again.");
      return;
    }

    try {
      const response = await axios.patch(`/traveler/user_reviews/${reviewId}`, reviewData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        }
      });

      const data = response.data;
      alert(data.message);
      setReviews(reviews.map(review => (review.id === reviewId ? { ...review, review_text: editReviewText } : review)));
      setEditReviewId(null);
      setEditReviewText('');
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        console.error('User is not authenticated');
        return;
      }

      await axios.delete(`/traveler/user_reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setReviews(reviews.filter(review => review.id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

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
              {review.location && ( 
                <div>
                  <p>Location:</p>
                  <p>Name: {review.location.name}</p>
                  {review.location.image_url && ( 
                    <img src={review.location.image_url} alt={review.location.name} style={{ maxWidth: '100px' }} />
                  )}
                </div>
              )}
              {editReviewId === review.id ? (
                <>
                  <textarea
                    value={editReviewText}
                    onChange={(e) => setEditReviewText(e.target.value)}
                  />
                  <button onClick={() => updateReview(review.id)}>Save</button>
                  <button onClick={() => { setEditReviewId(null); setEditReviewText(''); }}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => { setEditReviewId(review.id); setEditReviewText(review.review_text); }}>Edit</button>
                  <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
                </>
              )}
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
