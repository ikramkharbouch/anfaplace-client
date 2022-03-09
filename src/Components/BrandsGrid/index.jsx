import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Brand from '../Brand';
import './BrandsGrid.less';

const BrandsGrid = ({ brands, promo }) => {
	const [brandList, setBrandList] = useState([]);

	useEffect(() => {
		if (!promo) {
			setBrandList(brands);
		} else {
			setBrandList(brands?.filter((brd) => brd?.data?.enPromotion));
		}
	}, [brands, promo]);

	return (
		<div className="brands__grid">
			{brandList?.map((brand) => (
				<Brand
					key={brand?.index}
					withBadge={brand?.data?.Tags && !!brand?.data?.Tags[0]?.title}
					badgeColor={brand?.data?.Tags && brand?.data?.Tags[0]?.color}
					badgeText={brand?.data?.Tags && brand?.data?.Tags[0]?.title}
					brandImg={brand?.data?.Tags && brand?.data?.logo}
					brandName={brand?.data?.Tags && brand?.data?.titre}
					brandId={brand?.data?.Tags && brand?.index}
					isPromo={brand?.data?.enPromotion}
				/>
			))}
		</div>
	);
};
BrandsGrid.propTypes = {
	brands: PropTypes?.arrayOf(
		PropTypes?.shape({
			brandName: PropTypes?.string?.isRequired,
			brandId: PropTypes?.string?.isRequired,
			brandImg: PropTypes?.string?.isRequired,
			badgeText: PropTypes?.string,
			badgeColor: PropTypes?.string,
			imageType: PropTypes?.string,
		})
	),
	promo: PropTypes?.bool,
};
BrandsGrid.defaultProps = {
	brands: [],
	promo: false,
};

export default BrandsGrid;
