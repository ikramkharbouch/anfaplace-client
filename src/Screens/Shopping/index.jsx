import React from 'react';
import Slider from 'src/Components/Slider';
import BrandsGrid from 'src/Components/BrandsGrid';
import ShoppingSlide from 'src/Screens/Shopping/ShoppingSlide';
import './Shopping.less';
import BackButton from 'src/Components/BackButton/BackButton';

const Shopping = () => (
	<div className="shopping-screen">
		<BackButton text="Shopping" />
		<Slider
			className="shopping-slider"
			timeOnSliderEvent={(value) => console.log(value)}
			timeToReachEndOfSlider={(value) => console.log(value)}
			id="shopping"
		>
			<ShoppingSlide />
			<ShoppingSlide />
			<ShoppingSlide />
		</Slider>
		<BrandsGrid />
	</div>
);

export default Shopping;
