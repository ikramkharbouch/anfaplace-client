import React from 'react';
import { Header } from 'semantic-ui-react';
import './Brands.less';
import BrandsGrid from 'src/Components/BrandsGrid';
import Slider from 'src/Components/Slider';

const Brands = () => (
	<div className="brands">
		<Header as="h3">Marques</Header>
		<Slider id="brands">
			<BrandsGrid />
			<BrandsGrid />
			<BrandsGrid />
		</Slider>
	</div>
);

export default Brands;
