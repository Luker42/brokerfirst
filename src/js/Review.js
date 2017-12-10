import React from 'react';
import StarRating from 'react-star-ratings';
import '../css/Review.css';

const Review = (props) => {
  const reviewDate = new Date(props.review_date);
  return (
    <div className="broker-review-container">
        <div className="review-info">
	        <StarRating
	        	rating={props.review_rating}
	        	starWidthAndHeight={'20px'}
	        	numOfStars={5}
	        	starRatedColor={'#f8f90d'}
	        	starEmptyColor={'rgb(109, 122, 130)'}
	      	/>
	      	<br/>
	      	{props.user_first_name}
	      	{` - ${reviewDate.getDate()}/${reviewDate.getMonth()+1}/${reviewDate.getFullYear()}`}
      	</div>
        <div className="review-content">
        	{props.review_contents}
        </div>
    </div>
  );
}

export default Review;