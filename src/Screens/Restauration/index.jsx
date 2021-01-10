import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import Slider from 'src/Components/Slider';
import BrandsGrid from 'src/Components/BrandsGrid';
import RestaurationSlide from './ReastaurationSlide';
import './Restauration.less';

const selectBrandsRestauration = createSelector(
	(state) => state.brand.all,
	(brands) => brands.filter((brand) => brand.data.categorie === 'RESTAURATION')
);

const Restauration = () => {
	const brandsRestauration = useSelector(selectBrandsRestauration);
	return (
		<div className="restauration-screen">
			<Slider className="restauration-slider" id="offers">
				<RestaurationSlide />
				<RestaurationSlide />
				<RestaurationSlide />
			</Slider>
			<BrandsGrid brands={brandsRestauration} />
		</div>
	);
};

export default Restauration;
