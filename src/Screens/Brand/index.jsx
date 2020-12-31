import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Tab, Icon, Grid, Header } from 'semantic-ui-react';
import BackButton from 'src/Components/BackButton/BackButton';
import Slider from 'src/Components/Slider';
import { arrayBufferToBase64 } from 'src/utils/utilsFunctions';

import './Brand.less';
import { useSelector } from 'react-redux';

const OfferDetails = () => {
	const { id } = useParams();
	console.log(id);
	const marque = useSelector((state) => state.brand.all.find((item) => item.index === id));
	const panes = [
		{
			menuItem: 'Détails du magasin',
			render: () => (
				<Tab.Pane attached={false} className="brand-tab-content">
					<div className="brand-tab-infos">
						<div>
							<Icon size="large" name="sync" /> Niveau {marque.data.niveau}
						</div>
						<div className="phone-number">
							<Icon size="large" name="phone" />
							<span>Tél. {marque.data.phone}</span>
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
			render: () => (
				<Tab.Pane attached={false}>
					<Header as="h3">{marque.data.nom} :</Header>
					<Header as="h5">{marque.data.description}</Header>
				</Tab.Pane>
			),
		},
	];

	return (
		<div className="brand-details">
			<BackButton text="Marque" />

			<Slider pagination={false} id="brand-details">
				{marque &&
					marque.data.slider_elements
						.filter((slider) => slider.show)
						.map((slider) => (
							<div id={slider.id_element} key={slider.id_element} strength={60} className="slide-brand">
								<img
									alt={slider.titre}
									className="slider-image"
									src={arrayBufferToBase64(slider.content.data)}
								/>
								<div className="brand-image">
									<img src={arrayBufferToBase64(marque.data.logo.data)} alt="brand" />
								</div>
							</div>
						))}
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
};

export default OfferDetails;
