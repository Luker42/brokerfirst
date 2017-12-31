import React, { Component } from 'react';
import moment from 'moment';
import AvailabilityGrid from './AvailabilityGrid';
import '../css/Availability.css';

class Availability extends Component {
	state = {
		startDate: new Date(),
		endDate: new Date()
	};

	componentDidMount = () => {
		this.setState(() => {
			const startDate = this.getDateForRange(new Date(), 0);
			const endDate = this.getDateForRange(new Date(), 6);
			return {
				startDate,
				endDate,
				dateRange: this.getDates(startDate, endDate)
			};
		})
	}

	getDates = (startDate, stopDate) => {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
        dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
	}

	getDateForRange = ( date, dayIndex ) => {
    var day = date.getDay() || 7;  
    if( day !== dayIndex ) 
        date.setHours(-24 * (day - dayIndex)); 
    return date;
 	}

	render() {
		console.log(this.getDates(this.state.startDate, this.state.endDate))
		return (
			<div className="Availability">
				<AvailabilityGrid
					startDate={this.state.startDate}
					endDate={this.state.endDate}
				/>
			</div>
		);
	}
}

export default Availability;