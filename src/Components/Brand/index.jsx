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
	isPromo: PropTypes.bool,
	badgeColor: PropTypes.string,
	badgeText: PropTypes.string,
	brandName: PropTypes.string,
	brandImg: PropTypes.string,
	withBadge: PropTypes.bool,
	brandId: PropTypes.string,
};
Brand.defaultProps = {
	brandName: '',
	badgeText: '',
	badgeColor: '',
	brandImg: '',
	brandId: '',
	withBadge: false,
	isPromo: false,
};

export default Brand;
