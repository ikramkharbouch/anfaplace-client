import React from 'react';
import './Offers.less';
import Slider from 'src/Components/Slider';
import OfferSlide from './OfferSlide';

const Offers = () => (
	<Slider
		className="slider"
		timeOnSliderEvent={(value) => console.log(value)}
		timeToReachEndOfSlider={(value) => console.log(value)}
		id="offers"
	>
		<OfferSlide />
		<OfferSlide />
		<OfferSlide />
	</Slider>
);

export default Offers;
