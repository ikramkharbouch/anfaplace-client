import React from 'react';
import EventCard from 'src/Components/EventCard';
import './MyEventsList.less';

const MyEventsList = () => (
	<div id="my-events-screen">
		<EventCard />
		<EventCard />
		<EventCard />
	</div>
);

export default MyEventsList;
