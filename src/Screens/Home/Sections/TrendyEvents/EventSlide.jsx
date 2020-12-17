import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Image, Label } from 'semantic-ui-react';
import eventBg from 'src/assets/images/temp/event-bg.jpg';
import './EventSlide.less';

const EventSlide = ({ image, description, date }) => {
	const history = useHistory();
	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
		<div className="event-slide" onClick={() => history.push('/offer')}>
			<Image src={image} />
			<div className="details">
				<div className="tags">
					<Label>Brand</Label>
					<Label>Brand</Label>
				</div>
				<p className="description">{description}</p>
				<span className="date">{date}</span>
			</div>
		</div>
	);
};

EventSlide.propTypes = {
	image: PropTypes.string,
	description: PropTypes.string,
	date: PropTypes.string,
};
EventSlide.defaultProps = {
	image: eventBg,
	description: 'Titre de l’evenement sur 2 lignes et coupe la ligne ici IPSUM LOREM 3ELE …',
	date: '20 Oct - 25 Nov',
};
export default EventSlide;
