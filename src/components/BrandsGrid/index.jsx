import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Brand from '../Brand';
import './BrandsGrid.less';

const BrandsGrid = ({ brands, promo }) => {

	const [brandList, setBrandList] = useState([]);
	console.log(brands)

	useEffect(() => {
		if (!promo) {
			setBrandList(brands);
		} else {
			setBrandList(brands.filter(brd => brd?.data?.enPromotion))
		}

	}, [brands, promo]);

	return (
		<div className="brands__grid">
			{brandList.map((brand) => (
				<Brand
					withBadge={!!brand.data.Tags[0]?.title}
					badgeColor={brand.data.Tags[0]?.color}
					badgeText={brand.data.Tags[0]?.title}
					brandImg={brand.data.logo.data}
					brandName={brand.data.titre}
					brandId={brand.index}
					imageType={brand.data.logo.type}
				/>
			))}
		</div>
	);
}
BrandsGrid.propTypes = {
	brands: PropTypes.arrayOf(
		PropTypes.shape({
			brandName: PropTypes.string.isRequired,
			brandId: PropTypes.string.isRequired,
			brandImg: PropTypes.string.isRequired,
			badgeText: PropTypes.string,
			badgeColor: PropTypes.string,
			imageType: PropTypes.string,
		})
	),
	promo: PropTypes.bool,
};
BrandsGrid.defaultProps = {
	brands: [],
	promo: false
};

export default BrandsGrid;
