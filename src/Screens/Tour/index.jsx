import React from 'react';
import { useSelector } from 'react-redux';
import { Checkbox, Input } from 'semantic-ui-react';
import BackButton from 'src/Components/BackButton/BackButton';
import './Tour.less';
import BrandsGrid from 'src/Components/BrandsGrid';

const Tour = () => {
	const brands = useSelector((state) => state.brand.all);

	return (
		<div className="tour">
			<div className="search-bar">
				<BackButton className="back-tour" />
				<Input className="filter-brands" placeHolder="Filtrer" icon="search" iconPosition="right" />
			</div>

			<Checkbox className="in-promotion" label="En Promo" />
			<div style={{ clear: 'both' }} />

			<BrandsGrid brands={brands} />
		</div>
	);
};

export default Tour;
