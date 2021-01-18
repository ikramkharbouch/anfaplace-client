import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import Slider from 'src/Components/Slider';
import { Dimmer, Loader } from 'semantic-ui-react';
import { API } from 'src/utils/utilsFunctions';

import BrandsGrid from 'src/Components/BrandsGrid';
import RestaurationSlide from './ReastaurationSlide';
import './Restauration.less';

const selectBrandsRestauration = createSelector(
	(state) => state.brand.all,
	(brands) => brands.filter((brand) => brand.data.categorie === 'RESTAURATION')
);

const Restauration = () => {
	const brandsRestauration = useSelector(selectBrandsRestauration);
	const [sliders, setSliders] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!sliders) {
			API({ url: 'getSliderRestauration' })
				.then((result) => {
					setSliders(result.data.lists);
					setLoading(false);
				})
				.catch((error) => console.error(error));
		}
	}, [sliders]);

	return loading ? (
		<Dimmer active>
			<Loader />
		</Dimmer>
	) : (
		<div className="restauration-screen">
			{!!sliders.length && (
				<Slider className="shopping-slider" id="shopping">
					{sliders.map((slider) => (
						<RestaurationSlide image={slider.data.banniere} description={slider.data.titre} />
					))}
				</Slider>
			)}
			<div style={{ marginTop: 44 }}>
				<BrandsGrid brands={brandsRestauration} />
			</div>
		</div>
	);
};

export default Restauration;
