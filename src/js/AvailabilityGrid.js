import React, { Component } from 'react';
import moment from 'moment';
import WeekCalendar from 'react-week-calendar';
import 'react-week-calendar/dist/style.css';

class AvailabilityGrid extends Component {
	
	state = {
		selectedIntervals: [
			{
		    uid: 1,
		    start: moment("2017-12-24 8:00", "YYYY-MM-DD HH:mm"),
		    end: moment("2017-12-24 12:00", "YYYY-MM-DD HH:mm"),
		    value: "Reserved"
		  },
		  {
		    uid: 2,
		    start: moment("2017-12-25 12:00", "YYYY-MM-DD HH:mm"),
		    end: moment("2017-12-25 16:00", "YYYY-MM-DD HH:mm"),
		    value: "Reserved"
		  },
		  {
		    uid: 3,
		    start: moment("2017-12-26 12:00", "YYYY-MM-DD HH:mm"),
		    end: moment("2017-12-26 16:00", "YYYY-MM-DD HH:mm"),
		    value: "Reserved"
		  }
		]
	};

	render() {
		return (
			<div className='AvailabilityGrid'>
				<WeekCalendar
					dayFormat={'MM/DD'}
					scaleFormat={'hh:mm A'}
					selectedIntervals={this.state.selectedIntervals}
					numberOfDays={4}
					firstDay={moment(this.props.startDate)}
					scaleUnit={240}
					cellHeight={80}
					startTime={moment({h: 8, m: 0})}
					endTime={moment({h: 22, m: 0})}
				/>
			</div>
		);
	}
}

export default AvailabilityGrid;