import React from 'react';
import PropTypes from 'prop-types';
import Brand from '../Brand';
import './BrandsGrid.less';

const BrandsGrid = ({ brands }) => (
	<div className="brands__grid">
		{brands.map((brand) => (
			<Brand
				withBadge={!!brand.data.Tags[0]?.title}
				badgeColor={brand.data.Tags[0]?.color}
				badgeText={brand.data.Tags[0]?.title}
				brandImg={brand.data.logo.data}
				brandName={brand.data.titre}
				brandId={brand.index}
			/>
		))}
	</div>
);
BrandsGrid.propTypes = {
	brands: PropTypes.arrayOf(
		PropTypes.shape({
			brandName: PropTypes.string.isRequired,
			brandId: PropTypes.string.isRequired,
			brandImg: PropTypes.string.isRequired,
			badgeText: PropTypes.string,
			badgeColor: PropTypes.string,
		})
	),
};
BrandsGrid.defaultProps = {
	brands: [],
};

export default BrandsGrid;
