import React from 'react';
import { Parallax } from 'react-parallax';
import { Button, Tab, Icon, Grid } from 'semantic-ui-react';
import BackButton from 'src/Components/BackButton/BackButton';
import swatchImg from 'src/assets/images/brands/swatch-logo.svg';
import Slider from 'src/Components/Slider';

import img1 from 'src/assets/images/temp/swatch-1.jpg';
import img2 from 'src/assets/images/temp/swatch-sistem51-blue-3.jpeg';
import img3 from 'src/assets/images/temp/OI000014-01-800x600.jpeg';

import './Brand.less';

const panes = [
	{
		menuItem: 'Détails du magasin',
		render: () => (
			<Tab.Pane attached={false} className="brand-tab-content">
				<div className="brand-tab-infos">
					<div>
						<Icon size="large" name="sync" /> Niveau 1
					</div>
					<div className="phone-number">
						<Icon size="large" name="phone" />
						<span>Tél. 05 22 00 33 00</span>
					</div>
				</div>
				<div className="brand-tab-actions">
					<Grid padded={false}>
						<Grid.Row columns={16}>
							<Grid.Column width={8}>
								<Button icon="plus" content="Ajouter à la liste des visites" size="mini" inverted />
							</Grid.Column>
							<Grid.Column width={8}>
								<Button icon="heart" content="Ajouter aux favoris" size="mini" inverted />
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
			</Tab.Pane>
		),
	},
	{
		menuItem: 'À propos',
		render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
	},
];

const OfferDetails = () => (
	<div className="brand-details">
		<BackButton text="Marque" />
		<Slider pagination={false} id="brand-details">
			<Parallax bgImage={img1} strength={60}>
				<div className="parallax-content">
					<img src={swatchImg} alt="" />
				</div>
			</Parallax>
			<Parallax bgImage={img2} strength={200}>
				<div className="parallax-content">
					<img src={swatchImg} alt="" />
				</div>
			</Parallax>
			<Parallax bgImage={img3} strength={200}>
				<div className="parallax-content">
					<img src={swatchImg} alt="" />
				</div>
			</Parallax>
		</Slider>

		<div className="content description">
			<Tab
				className="toggle"
				menu={{ secondary: true, pointing: true, size: 'large', widths: 2 }}
				panes={panes}
			/>
		</div>
	</div>
);

export default OfferDetails;
