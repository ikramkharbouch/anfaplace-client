import React from 'react';
import { useHistory } from 'react-router-dom';
import './EntertainmentSlide.less';
import { ReactComponent as ArrowIcon } from 'src/assets/icons/arrow.svg';
import Image from 'src/Components/Image/index';
import sliderBg from 'src/assets/images/temp/entertainment-slider.jpg';
import { Button, Header } from 'semantic-ui-react';
import ClampLines from 'react-clamp-lines';

const EntertainmentSlide = () => {
	const history = useHistory();
	return (
		<div className="entertainment-slide">
			<Image src={sliderBg} />
			<div className="details">
				<ClampLines
					id="event"
					text="Et ceci est un titre de description avec deux ou trois lignes ipsum lorem de 3 lignes pour …"
					lines={3}
					ellipsis="..."
					className="title"
					innerElement="p"
					buttons={false}
				/>
				<Header as="h1"> 20 oct - 25 Nov </Header>

				<div className="actions">
					<Button inverted onClick={() => history.push('/offer')}>
						En savoir plus <ArrowIcon />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default EntertainmentSlide;
