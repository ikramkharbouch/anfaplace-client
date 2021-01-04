import React from 'react';
import BrandsGrid from 'src/Components/BrandsGrid';
import swatch from 'src/assets/images/brands/swatch-logo.svg';
import handM from 'src/assets/images/brands/h&m.svg';

const tempBrands = [
	{ index: '1', data: { Tags: [], logo: { type: 'url', data: swatch }, titre: 'swatch' } },
	{ index: '2', data: { Tags: [], logo: { type: 'url', data: handM }, titre: 'h&m' } },
	{ index: '3', data: { Tags: [], logo: { type: 'url', data: swatch }, titre: 'swatch' } },
	{ index: '4', data: { Tags: [], logo: { type: 'url', data: handM }, titre: 'h&m' } },
];

const MyVisitedList = () => (
	<div style={{ paddingTop: 70 }}>
		<BrandsGrid brands={tempBrands} />
	</div>
);

export default MyVisitedList;
