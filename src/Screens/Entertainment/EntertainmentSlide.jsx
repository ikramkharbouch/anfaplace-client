import React from 'react';

import './EntertainmentSlide.less';
import Image from 'src/Components/Image/index';
import sliderBg from 'src/assets/images/temp/entertainment-slider.jpg';
import { Button, Header } from 'semantic-ui-react';

const EntertainmentSlide = () => (
	<div className="entertainment-slide">
		<Image src={sliderBg} />
		<div className="details">
			<Header as="h1">CECI EST UN GRAND TITRE </Header>
			<p>
				Et ceci est un titre de description avec deux ou trois lignes ipsum lorem de 3 lignes pour test{' '}
			</p>

			<div className="actions">
				<Button color="grey" icon="plus" content="Ajouter à la liste des visites" inverted fluid />
				<Button color="grey" icon="heart" content="Ajouter aux favoris" inverted fluid />
			</div>
		</div>
	</div>
);

export default EntertainmentSlide;
