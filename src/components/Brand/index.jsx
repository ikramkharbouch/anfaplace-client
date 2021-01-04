import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { arrayBufferToBase64 } from 'src/utils/utilsFunctions';

import Badgbe from '../Badge';

import './brand.less';

<<<<<<< HEAD
const Brand = ({ badgeColor, badgeText, brandImg, imageType, brandName, withBadge, brandId }) => (
	<Link to={`/brand/${brandId}`} className="brand-container">
=======
const Brand = ({ badgeColor, badgeText, brandImg, brandName, withBadge, brandId, brandLink }) => (
	<Link to={brandLink} className="brand-container" dataid={brandId}>
>>>>>>> 4eb369158a22b907099667df4ce922d29b7270a8
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
<<<<<<< HEAD
	imageType: PropTypes.string,
};
Brand.defaultProps = {
	imageType: 'Buffer',
=======
	brandLink: PropTypes.string.isRequired,
>>>>>>> 4eb369158a22b907099667df4ce922d29b7270a8
};

export default Brand;
