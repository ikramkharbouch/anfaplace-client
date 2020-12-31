import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { arrayBufferToBase64 } from 'src/utils/utilsFunctions';

import Badgbe from '../Badge';

import './brand.less';

const Brand = ({ badgeColor, badgeText, brandImg, brandName, withBadge, brandLink }) => (
	<Link to={brandLink} className="brand-container">
		{withBadge && <Badgbe color={badgeColor} title={badgeText} />}
		<img src={`${arrayBufferToBase64(brandImg)}`} alt={brandName} />
	</Link>
);

Brand.propTypes = {
	badgeColor: PropTypes.string.isRequired,
	badgeText: PropTypes.string.isRequired,
	brandName: PropTypes.string.isRequired,
	brandImg: PropTypes.string.isRequired,
	withBadge: PropTypes.bool.isRequired,
	brandLink: PropTypes.string.isRequired,
};

export default Brand;
