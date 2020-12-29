import React from 'react';
import PropTypes from 'prop-types';
import imgBg from 'src/assets/images/temp/discoverEvent.png';
import { Label } from 'semantic-ui-react';
import ClampLines from 'react-clamp-lines';

import './EventSliderCard.less';

const EventSliderCard = ({ img, floor, title }) => (
	<div className="event-slider-card">
		<img src={img} alt="bg" />
		<div className="details">
			<Label>
				<span className="cutout" />
				{floor}
			</Label>
			<ClampLines
				id="event"
				text={title}
				lines={2}
				ellipsis="..."
				className="title"
				innerElement="h5"
			/>
		</div>
	</div>
);

EventSliderCard.propTypes = {
	img: PropTypes.string,
	floor: PropTypes.string,
	title: PropTypes.string,
};
EventSliderCard.defaultProps = {
	img: imgBg,
	floor: 'Rez-de-chaussée',
	title: 'Titre de l’evenement sur 2 lignes et coupe la ligne ici …',
};
export default EventSliderCard;
