import React from 'react';
import PropTypes from 'prop-types';
import { Image, Label } from 'semantic-ui-react';
import eventBg from '../../../../assets/images/temp/event-bg.jpg';
import './EventSlide.less';

const EventSlide = ({ image, description, date }) => (
  <div className="event-slide">
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
