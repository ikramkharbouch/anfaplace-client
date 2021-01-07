import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Button, Header } from 'semantic-ui-react';

import Slider from 'src/Components/Slider';
import EventCard from '../../../../Components/EventCard';
import './TrendyEvents.less';

const TrendyEvents = ({ sliderLoaded }) => {
	const history = useHistory();
	const events = useSelector((state) => state.event.list);

	console.log(events)
	return (
		<div className="trendy-events">
			<Header as="h3">ÉVÉNEMENTS TENDANCE</Header>
			<Slider
				onInit={sliderLoaded}
				id="trendy-events"
				slidesOffsetBefore={20}
				pagination={false}
				slidersPerView={1.42}
			>
				{events.slice(0, 5).map((event) => (
					<EventCard event={event} />
				))}
			</Slider>
			<Button onClick={() => history.push('/events')} className="more" circular>
				Voir tous les événements
			</Button>
		</div>
	);
};
TrendyEvents.propTypes = {
	sliderLoaded: PropTypes.func.isRequired,
};
export default TrendyEvents;
