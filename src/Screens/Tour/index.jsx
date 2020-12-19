import React from 'react';
import { Checkbox, Input } from 'semantic-ui-react';
import BackButton from 'src/Components/BackButton/BackButton';
import './Tour.less';
import BrandsGrid from 'src/Components/BrandsGrid';

const Tour = () => (
	<div className="tour">
		<div className="search-bar">
			<BackButton />
			<Input className="filter-brands" placeHolder="Filtrer" icon="search" iconPosition="right" />
		</div>

		<Checkbox className="in-promotion" label="En Promo" />
		<div style={{ clear: 'both' }} />

		<BrandsGrid />
	</div>
);

export default Tour;
