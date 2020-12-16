import React from 'react';
import Slider from 'src/Components/Slider';
import BrandsGrid from 'src/Components/BrandsGrid';
import BackButton from 'src/Components/BackButton/BackButton';
import RestaurationSlide from './ReastaurationSlide';
import './Restauration.less';

const Restauration = () => (
	<div className="restauration-screen">
		<BackButton text="restauration" />
		<Slider
			className="restauration-slider"
			timeOnSliderEvent={(value) => console.log(value)}
			timeToReachEndOfSlider={(value) => console.log(value)}
			id="offers"
		>
			<RestaurationSlide />
			<RestaurationSlide />
			<RestaurationSlide />
		</Slider>
		<BrandsGrid />
	</div>
);

export default Restauration;
