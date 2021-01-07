import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './EntertainmentSlide.less';
import { ReactComponent as ArrowIcon } from 'src/assets/icons/arrow.svg';
// import sliderBg from 'src/assets/images/temp/entertainment-slider.jpg';
import { Button, Label } from 'semantic-ui-react';
import ClampLines from 'react-clamp-lines';

import { removeTags, arrayBufferToBase64 } from 'src/utils/utilsFunctions';

const EntertainmentSlide = ({ count, event, image }) => {
	const history = useHistory();
	const { id, tag } = event;
	console.log(typeof tag)
	const Tags = typeof tag === 'string' ? JSON.parse(tag) : tag;
	return (
		<div className={`entertainment-slide ${count === 1 ? 'first-slide' : ''}`}>
			<img src={arrayBufferToBase64(image)} alt="slide" />
			<div className="details">
				<div className="tags">
					{
						Tags.map(Tag => (
							<Label key={Tag}> {Tag.toLowerCase()} </Label>
						))
					}
				</div>
				<ClampLines
					id={id}
					text={removeTags(event.contenu_body)}
					lines={3}
					ellipsis="..."
					className="title"
					innerElement="p"
					buttons={false}
				/>
				<div className="actions">
					<Button inverted onClick={() => history.push({
						pathname: `/events/${id}`,
						state: {
							debutTime: event.debut_time,
							finTime: event.fin_time,
							tags: event.tag,
							image: arrayBufferToBase64(image),
							contenuBoody: event.contenu_body,
							titre: event.titre
						}
					})}>
						En savoir plus <ArrowIcon />
					</Button>
				</div>
			</div>
		</div>
	);
};
EntertainmentSlide.propTypes = {
	count: PropTypes.number,
	event: PropTypes.shape({
		id: PropTypes.string.isRequired,
		contenu_body: PropTypes.string.isRequired,
		tag: PropTypes.arrayOf(PropTypes.string),
		debut_time: PropTypes.string.isRequired,
		fin_time: PropTypes.string.isRequired,
		titre: PropTypes.string.isRequired,
	}),
	image: PropTypes.arrayOf(PropTypes.number).isRequired,
};


EntertainmentSlide.defaultProps = {
	count: 0,
	event: {
		data: {
			titre: 'Titre de l’evenement sur 2 lignes et coupe la ligne ici IPSUM LOREM 3ELE …',
			debut_time: '20 Oct',
			fin_time: ' 25 Nov',
			id: '',
		},
	},
};

export default EntertainmentSlide;
