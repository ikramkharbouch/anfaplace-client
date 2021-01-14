import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Slider from 'src/Components/Slider';
import BrandsGrid from 'src/Components/BrandsGrid';
import ShoppingSlide from 'src/Screens/Shopping/ShoppingSlide';
import './Shopping.less';
import { API } from 'src/utils/utilsFunctions';
import { Dimmer, Loader } from 'semantic-ui-react';

const Shopping = () => {
	const brands = useSelector((state) =>
		state.brand.all.filter(
			(brand) => !['RESTAURATION', 'DIVERTISSEMENT'].includes(brand.data.categorie)
		)
	);
	const [sliders, setSliders] = useState();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (!sliders) {
			API({ url: 'getSliderShopping' })
				.then((result) => {
					console.log(result.data)
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
		<div className="shopping-screen">
			<Slider className="shopping-slider" id="shopping">
				{sliders.map((slider) => (
					<ShoppingSlide image={slider.data.banniere} description={slider.data.titre} />
				))}
			</Slider>
			<BrandsGrid brands={brands} />
		</div>
	);
};

export default Shopping;
