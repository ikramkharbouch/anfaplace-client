import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { arrayBufferToBase64 } from 'src/utils/utilsFunctions';

import Badgbe from '../Badge';

import './brand.less';

const Brand = ({ badgeColor, badgeText, brandImg, imageType, brandName, withBadge, brandId }) => (
	<Link to={`/brand/${brandId}`} className="brand-container">
		{withBadge && <Badgbe color={badgeColor} title={badgeText} />}
		<img
			src={`${imageType === 'Buffer' ? arrayBufferToBase64(brandImg) : brandImg}`}
			alt={brandName}
		/>
	</Link>
);

Brand.propTypes = {
	badgeColor: PropTypes.string.isRequired,
	badgeText: PropTypes.string.isRequired,
	brandName: PropTypes.string.isRequired,
	brandImg: PropTypes.string.isRequired,
	withBadge: PropTypes.bool.isRequired,
	brandId: PropTypes.string.isRequired,
	imageType: PropTypes.string,
};
Brand.defaultProps = {
	imageType: 'Buffer',
};

export default Brand;
