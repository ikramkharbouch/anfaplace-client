import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Badgbe from '../Badge';

import './brand.less';

const Brand = ({ badgeColor, badgeText, brandImg, brandName, withBadge, brandId, isPromo }) => (
	<Link to={`/brand/${brandId}`} className="brand-container">
		{withBadge && <Badgbe color={badgeColor} title={badgeText} />}
		{isPromo && <Badgbe color="yellow" title="EN PROMO" />}
		<img src={brandImg} alt={brandName} />
	</Link>
);

Brand.propTypes = {
	isPromo: PropTypes.bool.isRequired,
	badgeColor: PropTypes.string.isRequired,
	badgeText: PropTypes.string.isRequired,
	brandName: PropTypes.string.isRequired,
	brandImg: PropTypes.string.isRequired,
	withBadge: PropTypes.bool.isRequired,
	brandId: PropTypes.string.isRequired,
};
Brand.defaultProps = {};

export default Brand;
