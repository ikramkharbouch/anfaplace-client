import React from 'react';
import { Button, Header } from 'semantic-ui-react';

import Slider from 'src/Components/Slider';
import EventSlide from './EventSlide';
import './TrendyEvents.less';

const TrendyEvents = () => (
	<div className="trendy-events">
		<Header as="h3">ÉVÉNEMENTS TENDANCE</Header>
		<Slider id="trendy-events" slidesOffsetBefore={20} pagination={false} slidersPerView={1.42}>
			<EventSlide />
			<EventSlide />
			<EventSlide />
			<EventSlide />
		</Slider>
		<Button className="more" circular>
			Voir tous les événements
		</Button>
	</div>
);

export default TrendyEvents;
