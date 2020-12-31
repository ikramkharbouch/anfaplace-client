import React from 'react';
import { useSelector } from 'react-redux';
import Slider from 'src/Components/Slider';
import BrandsGrid from 'src/Components/BrandsGrid';
import ShoppingSlide from 'src/Screens/Shopping/ShoppingSlide';
import './Shopping.less';
import BackButton from 'src/Components/BackButton/BackButton';

const Shopping = () => {
	const brands = useSelector((state) => state.brand.all);
	return (
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
			<BrandsGrid brands={brands} />
		</div>
	);
};

export default Shopping;
