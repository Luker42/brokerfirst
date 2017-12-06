import React from 'react';
import StarRating from 'react-star-ratings';
import '../css/Review.css';

const Review = (props) => {
  return (
    <div className="broker-review-container">
      <StarRating
        rating={Math.round(props.broker_rating * 10) / 10}
        starWidthAndHeight={'20px'}
        numOfStars={5}
      />
    </div>
  );
}

export default Review;