import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './OfferSlide.less';
import { Button } from 'semantic-ui-react';
import { ReactComponent as ArrowIcon } from 'src/assets/icons/arrow.svg';
import sliderImage from 'src/assets/images/temp/slider.jpg';

const OfferSlide = ({ image, description, date }) => {
	const history = useHistory();

	return (
		<div className="offerSlide">
			<img src={image} alt="slider" />
			<div className="offer-details">
				<p className="offer-description">{description}</p>
				<span className="offer-date">{date}</span>
				<Button inverted onClick={() => history.push('/offer')}>
					En savoir plus <ArrowIcon />
				</Button>
			</div>
		</div>
	);
};

OfferSlide.propTypes = {
	image: PropTypes.string,
	description: PropTypes.string,
	date: PropTypes.string,
};
OfferSlide.defaultProps = {
	image: sliderImage,
	description: 'LA nouvelle plateforme anfa place ipsum  LOREM',
	date: '08 déc - 12 déc',
};

export default OfferSlide;
