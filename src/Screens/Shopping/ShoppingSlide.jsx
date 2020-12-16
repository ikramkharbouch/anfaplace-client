import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ShoppingSlide.less';
import { Button } from 'semantic-ui-react';
import { ReactComponent as ArrowIcon } from 'src/assets/icons/arrow.svg';
import sliderImage from 'src/assets/images/temp/shoping-slider-bg.jpg';

const ShoppingSlide = ({ image, description, date }) => {
	const history = useHistory();

	return (
		<div className="shoppingSlide">
			<img src={image} alt="slider" />
			<div className="shopping-details">
				<p className="shopping-description">{description}</p>
				<span className="shopping-date">{date}</span>
				<Button inverted onClick={() => history.push('/shopping')}>
					En savoir plus <ArrowIcon />
				</Button>
			</div>
		</div>
	);
};

ShoppingSlide.propTypes = {
	image: PropTypes.string,
	description: PropTypes.string,
	date: PropTypes.string,
};
ShoppingSlide.defaultProps = {
	image: sliderImage,
	description: 'LA nouvelle plateforme anfa place ipsum  LOREM',
	date: '08 déc - 12 déc',
};

export default ShoppingSlide;
