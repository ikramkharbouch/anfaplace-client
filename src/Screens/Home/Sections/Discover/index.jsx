import React from 'react';
import Slider from 'src/Components/Slider';
import EventSliderCard from 'src/Screens/Home/Sections/Discover/EventSliderCard';
import './Discover.less';
import { Header } from 'semantic-ui-react';

const Discover = () => (
	<>
		<Header as="h3" style={{ paddingLeft: 20 }}>
			À DÉCOUVRIR
		</Header>

		<Slider
			id="discover"
			pagination
			slidesPerGroup={2}
			slidesOffsetBefore={20}
			slidesPerColumn={2}
			slidersPerView={1.42}
			autoplay={false}
		>
			<EventSliderCard />
			<EventSliderCard />
			<EventSliderCard />
			<EventSliderCard />
			<EventSliderCard />
			<EventSliderCard />
		</Slider>
	</>
);

export default Discover;
