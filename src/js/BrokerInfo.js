import React, { Component } from 'react';
import StarRating from 'react-star-ratings'; 
import Modal from 'react-modal';
import { Row, Col } from 'react-grid-system';
import '../css/BrokerInfo.css';

const EditButton = (props) => {
	return (
		<div className="editbutton" onClick={props.onClick}>
			Edit your info
		</div>
	);
}

const EditForm = (props) => {
	const {broker} = props;
	console.log(broker,props)
	return (
		<div className="brokerinfo-edit-form">
		<Row>
			<Col lg={6}>
				<div className='edit-avatar-container'>
					<img
		        className="brokerview-avatar"
		        src={broker.broker_avatar}
		        alt={broker.broker_alt}
		      />
		      <input type='file' name='avatarUpload' />
	      </div><br/>
				<label htmlFor='firstName'>
		      First name:&nbsp;
		      <input name='firstName' type="text" className="edit-input" value={broker.broker_first_name}/>
		    </label><br/>
		    <label htmlFor='lastName'>
		      Last name:&nbsp;
		      <input name='lastName' type="text" className="edit-input" value={broker.broker_last_name}/>
		    </label><br/>
		    <label htmlFor='experience'>
		      Experience:&nbsp;
		      <input name='experience' type="text" className="edit-input" value={broker.broker_experience}/>
		    </label><br/>
	    </Col>
	    <Col lg={6}>
		    <label htmlFor='interests'>
		      Interests:&nbsp;
		      <input name='interests' type="text" className="edit-input" value={broker.broker_interests}/>
		    </label><br/>
		    <label htmlFor='education'>
		      Education:&nbsp;
		      <input name='education' type="text" className="edit-input" value={broker.broker_education}/>
		    </label><br/>
		    <label htmlFor='bio'>
		      Bio:&nbsp;
		      <textarea name='bio' rows="20" cols="20" className="edit-input" value={broker.broker_bio}/>
		    </label><br/>
	    </Col>
	    </Row>
	    <button
        className="brokerview-message-button"
      >
        Save changes
    	</button>
		</div>
	);
}

class BrokerInfo extends Component {
	state = {
		isEditModalOpen: false
	};


	render() {
		const { broker, isCurrentBrokerAccount } = this.props;
	  return (
	    <div className="brokerview-info">
	      <div className="broker-avatar-container">
	        <img
	          className="brokerview-avatar"
	          src={broker.broker_avatar}
	          alt={broker.broker_alt}
	        />
	        <div className="brokerview-avatar-info">
	          <div className="brokerview-name">
	            {`${broker.broker_first_name} ${broker.broker_last_name}`}
	          </div>
	          <a href="#" className="brokerage">
	            {broker.brokerage_name}
	          </a>
	          <div>
	            <StarRating
	              rating={Math.round(broker.broker_rating * 10) / 10}
	              starWidthAndHeight={'20px'}
	              numOfStars={5}
	              starRatedColor={'#f6b85c'}
	              starEmptyColor={'rgb(109, 122, 130)'}
	            />
	          </div>
	        </div>
	      </div>
	      <div className="brokerview-info-line">
	        Bio: {broker.broker_bio}
	      </div>
	      <div className="brokerview-info-line">
	        Experience: {broker.broker_experience}
	      </div>
	      <div className="brokerview-info-line">
	        Interests: {broker.broker_interests}
	      </div>
	      <div className="brokerview-info-line">
	        Education: {broker.broker_education}
	      </div>
	      <div className="brokerview-info-line">
	      	Languages spoken: {broker.broker_languages}
	      </div>
	      <div className="brokerview-info-line">
	        <button
	            className="brokerview-message-button"
	          >
	            {`Message ${broker.broker_first_name}`}
	        </button>
	      </div>
	      {isCurrentBrokerAccount &&
	      	<EditButton 
	      		onClick={() => {
	      			this.setState({isEditModalOpen: true})
	      		}}
	      	/>
	    	}
	    	{isCurrentBrokerAccount &&
	    		<Modal
	    			isOpen={this.state.isEditModalOpen}
	    			onRequestClose={() => {
	    				this.setState({isEditModalOpen: false})
	    			}}
	    			style={{
	    				content:{
	    					height: '600px',
	    					width: '800px',
	    					margin: '0 auto'
	    				}
	    			}}
	    		>
	    			<EditForm
	    				broker={broker}

	    			/>
	    		</Modal>
	    	}
	    </div>
	  );
	}
}

export default BrokerInfo;
