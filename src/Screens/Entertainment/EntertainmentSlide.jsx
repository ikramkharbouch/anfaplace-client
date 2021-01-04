import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './EntertainmentSlide.less';
import { ReactComponent as ArrowIcon } from 'src/assets/icons/arrow.svg';
import Image from 'src/Components/Image/index';
import sliderBg from 'src/assets/images/temp/entertainment-slider.jpg';
import { Button, Label } from 'semantic-ui-react';
import ClampLines from 'react-clamp-lines';

const EntertainmentSlide = ({ count }) => {
	const history = useHistory();
	return (
		<div className={`entertainment-slide ${count === 1 ? 'first-slide' : ''}`}>
			<Image src={sliderBg} />
			<div className="details">
				<div className="tags">
					<Label> Gymbo </Label>
				</div>
				<ClampLines
					id="event"
					text="Et ceci est un titre de description avec deux ou trois lignes ipsum lorem de 3 lignes pour …"
					lines={3}
					ellipsis="..."
					className="title"
					innerElement="p"
					buttons={false}
				/>
				<div className="actions">
					<Button inverted onClick={() => history.push('/offer')}>
						En savoir plus <ArrowIcon />
					</Button>
				</div>
			</div>
		</div>
	);
};
EntertainmentSlide.propTypes = {
	count: PropTypes.number,
};
EntertainmentSlide.defaultProps = {
	count: 0,
};

export default EntertainmentSlide;
