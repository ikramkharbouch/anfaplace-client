import React from 'react';
import PropTypes from 'prop-types';
import './RestaurationSlide.less';

import sliderImage from 'src/assets/images/temp/restauration-slider-bg.jpg';

const RestaurationSlide = ({ image, description, date }) => (
	<div className="restaurationSlide">
		<img src={image} alt="slider" />
		<div className="restauration-details">
			<p className="restauration-description">{description}</p>
			<span className="restauration-date">{date}</span>
		</div>
	</div>
);

RestaurationSlide.propTypes = {
	image: PropTypes.string,
	description: PropTypes.string,
	date: PropTypes.string,
};
RestaurationSlide.defaultProps = {
	image: sliderImage,
	description: 'LA nouvelle plateforme Anfaplace Mall ipsum  LOREM',
	date: '08 déc - 12 déc',
};

export default RestaurationSlide;
