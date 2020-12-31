import React from 'react';
import { useSelector } from 'react-redux';
import { Header } from 'semantic-ui-react';
import './Brands.less';
import Slider from 'src/Components/Slider';
import Brand from 'src/Components/Brand';

const Brands = () => {
	const brands = useSelector((state) => state.brand.all);
	console.log(brands);
	return (
		<div className="brands">
			<Header as="h3">Marques</Header>

			<Slider id="brands" autoplay={false} slidesPerGroup={2} slidesPerColumn={2} slidersPerView={2}>
				{brands.map((marque) => (
					<div key={marque.index} id={marque.index} className="brand-slider-container">
						<Brand
							brandImg={marque.data.logo.data}
							brandName="swatch"
							brandLink={`/brand/${marque.index}`}
						/>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default Brands;
