import React from 'react';
import PropTypes from 'prop-types';

import { Button, Header } from 'semantic-ui-react';

import Slider from 'src/Components/Slider';
import EventCard from '../../../../Components/EventCard';
import './TrendyEvents.less';

const TrendyEvents = ({ sliderLoaded }) => (
	<div className="trendy-events">
		<Header as="h3">ÉVÉNEMENTS TENDANCE</Header>
		<Slider
			onInit={sliderLoaded}
			id="trendy-events"
			slidesOffsetBefore={20}
			pagination={false}
			slidersPerView={1.42}
		>
			<EventCard />
			<EventCard />
			<EventCard />
			<EventCard />
		</Slider>
		<Button className="more" circular>
			Voir tous les événements
		</Button>
	</div>
);
TrendyEvents.propTypes = {
	sliderLoaded: PropTypes.func.isRequired,
};
export default TrendyEvents;
