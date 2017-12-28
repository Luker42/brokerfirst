import React from 'react';
import '../css/Listing.css';


const Listing = (props) => {
  return (
    <div className="brokerview-listing-container">
        <div>{props.listing_title}</div>
        <div className="brokerview-listing-picture-info-container">
	        <div className="brokerview-listing-picture-container">
	        	<img
	        		className="brokerview-listing-picture"
	        		src={`/images/${props.photo_url}`}
	        		alt={props.listing_id}
	        	/>
	        </div>
	        <div className="brokerview-listing-info">
	        	<ul className="listing-info-list">
	        		<li className="listing-info">
	        			{`Neighborhood: ${props.neighborhood_name}`}
	        		</li>
	        		<li className="listing-info">
						{`Beds: ${props.bedroom_count}`}
	        		</li>
	        		<li className="listing-info">
	        			{`Bath: ${props.bathroom_count}`}
	        		</li>
	        		<li className="listing-info">
	        			{`Rent: ${props.rent}`}
	        		</li>
	        	</ul>
	        </div>
        </div>
        <div className="brokerview-listing-description">
        	{props.details}
        </div>
    </div>
  );
}

export default Listing;