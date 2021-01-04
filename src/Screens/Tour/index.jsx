import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { Checkbox, Input } from 'semantic-ui-react';
import BackButton from 'src/Components/BackButton/BackButton';
import './Tour.less';
import BrandsGrid from 'src/Components/BrandsGrid';

const brandsSelector = createSelector(
	(state) => state.brand.all,
	(_, filter) => filter,
	(brands, filter) =>
		brands.filter((brand) =>
			filter
				? brand.data.nom
						.toLowerCase()
						.split(' ')
						.join('')
						.includes(filter.split(' ').join('').toLowerCase())
				: true
		)
);

const Tour = () => {
	const [filterValue, setFilterValue] = useState();

	const brands = useSelector((state) => brandsSelector(state, filterValue));
	return (
		<div className="tour">
			<div className="search-bar">
				<BackButton className="back-tour" />
				<Input
					className="filter-brands"
					value={filterValue}
					onChange={({ target: { value } }) => setFilterValue(value)}
					placeHolder="Filtrer"
					icon="search"
					iconPosition="right"
				/>
			</div>

			<Checkbox className="in-promotion" label="En Promo" />
			<div style={{ clear: 'both' }} />

			<BrandsGrid brands={brands} />
		</div>
	);
};

export default Tour;
