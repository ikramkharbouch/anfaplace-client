/* eslint-disable */
import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Header, Icon, Label } from 'semantic-ui-react';
import './EventCard.less';
import ClampLines from 'react-clamp-lines';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { arrayBufferToBase64, removeTags } from 'src/utils/utilsFunctions';
import 'dayjs/locale/fr';

dayjs.locale('fr');

dayjs.extend(customParseFormat);

const EventCard = ({ event }) => {
	const history = useHistory();
	console.log(event)
	const { tag } = event.data;
	const Tags = typeof tag === 'string' ? JSON.parse(tag) : tag;


	const handleClick = () => {
		history.push({
			pathname: `/events/${event.id}`,
			state: {
				debutTime: event.data.debut_time,
				finTime: event.data.fin_time,
				tags: event.data.tag,
				image: arrayBufferToBase64(event.data.slider_elements[0]?.content.data),
				contenuBoody: event.data.contenu_body,
				titre: event.data.titre
			}
		})
	}


	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
		<div className="event-card" onClick={handleClick}>
			{/* eslint-disable-next-line react/prop-types */}
			{event.data.slider_elements[0]?.content.data ? (
				<img src={arrayBufferToBase64(event.data.slider_elements[0]?.content.data)} alt="event" />
			) : (
					<Header as="h1" icon="image">
						No image
					<Icon icon="image" />
					</Header>
				)}
			<div className="details">
				<Label className="point">
					<Icon name="gift" size="small" />
					{event.data.points}p
				</Label>
				<div className="d-flex flex-column justify-content-between">
					<div className="tags">
						{Tags.filter((_, index) => index < 2).map(Tag => (
							<Label key={Tag}> {Tag.toLowerCase()} </Label>
						))}
					</div>
					<ClampLines
						id="event"
						text={removeTags(event.data.contenu_body)}
						lines={2}
						ellipsis="..."
						className="title"
						innerElement="p"
						buttons={false}
					/>
					<span className="date">
						{dayjs(event.data.debut_time, 'DD/MM/YYYY').format('D MMM')} -{' '}
						{dayjs(event.data.fin_time, 'DD/MM/YYYY').format('D MMM')}
					</span>
				</div>

			</div>
		</div>
	);
};

EventCard.propTypes = {
	event: PropTypes.shape({
		index: PropTypes.string,
		data: PropTypes.shape({
			titre: PropTypes.string,
			fin_time: PropTypes.string,
			debut_time: PropTypes.string,
			tag: PropTypes.arrayOf(PropTypes.string),
			image: PropTypes.string,
		}),
	}),
};
EventCard.defaultProps = {
	event: {
		data: {
			titre: 'Titre de l’evenement sur 2 lignes et coupe la ligne ici IPSUM LOREM 3ELE …',
			debut_time: '20 Oct',
			fin_time: ' 25 Nov',
			image: '',
		},
	},
};
export default EventCard;
