import React, { createRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './OfferSlide.less';
import { Button } from 'semantic-ui-react';
import { ReactComponent as ArrowIcon } from 'src/assets/icons/arrow.svg';
import sliderImage from 'src/assets/images/temp/slider.jpg';
import Image from 'src/Components/Image/index';

const OfferSlide = ({ image, description, article }) => {
	const history = useHistory();
	const offerSlide = createRef();
	useEffect(() => {
		offerSlide.current.style.height = `${window.innerHeight}px`;
	});
	return (
		<div ref={offerSlide} className="offerSlide">
			<Image src={image} loader="" />
			<div className="offer-details">
				<p className="offer-description">{description}</p>
				<Button
					inverted
					onClick={() =>
						history.push({
							pathname: `/article/${article.id}`,
							state: {
								debutTime: article.debut_time,
								finTime: article.fin_time,
								tags: article.tags,
								image: article.banniere,
								contenuBoody: article.contenu_body,
								titre: article.titre,
								slider_elements: article.slider_elements,
							},
						})
					}
				>
					En savoir plus <ArrowIcon />
				</Button>
			</div>
		</div>
	);
};

const SliderElement = PropTypes.shape({
	titre: PropTypes.string,
	show: PropTypes.bool,
	id_element: PropTypes.string,
	content: PropTypes.arrayOf({
		data: PropTypes.number,
	}),
});

OfferSlide.propTypes = {
	image: PropTypes.string,
	description: PropTypes.string,
	article: PropTypes.shape({
		id: PropTypes.string,
		contenu_body: PropTypes.string,
		tag: PropTypes.arrayOf(PropTypes.string),
		banniere: PropTypes.string,
		debut_time: PropTypes.string,
		fin_time: PropTypes.string,
		titre: PropTypes.string,
		slider_elements: PropTypes.arrayOf(SliderElement),
		tags: PropTypes.string,
	}),
};
OfferSlide.defaultProps = {
	image: sliderImage,
	description: 'LA nouvelle plateforme Anfaplace Mall ipsum  LOREM',
	article: {
		data: {
			titre: 'Titre de l’evenement sur 2 lignes et coupe la ligne ici IPSUM LOREM 3ELE …',
			debut_time: '20 Oct',
			fin_time: ' 25 Nov',
			id: '',
			tags: '',
		},
	},
};

export default OfferSlide;
