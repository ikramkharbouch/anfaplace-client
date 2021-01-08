import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Tab, Icon, Grid, Header, Divider } from 'semantic-ui-react';
import Slider from 'src/Components/Slider';
import { arrayBufferToBase64 } from 'src/utils/utilsFunctions';
import CouponCard from 'src/Components/CouponCard';
import brandSrc from 'src/assets/images/brands/GO_Sport_logo.svg';
import './Brand.less';
import { useSelector, useDispatch } from 'react-redux';
import { openPhoneAuth } from 'src/store/app';

const initialState = [
	{
		id: 1,
		url: `/coupon-list/1`,
		img: brandSrc,
		amount: '50dh',
		date: `03/04/2021`,
		points: '50 points',
		title: 'Go sport',
		available: true,
		active: true,
	},
];

const OfferDetails = () => {
	const { id } = useParams();
	const marque = useSelector((state) => state.brand.all.find((item) => item.index === id));
	const user = useSelector((state) => state.user.currentUser);
	const dispatch = useDispatch();

	const handleAddToFav = () => {
		if (!user) {
			dispatch(openPhoneAuth(true));
		}
	};
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
								<Grid.Column width={16}>
									<Button
										icon="plus"
										onClick={handleAddToFav}
										content="Ajouter à la liste des visites"
										size="mini"
										inverted
									/>
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
					<Header as="h3">{marque.data.nom}</Header>
					<Header as="p">{marque.data.description}</Header>
				</Tab.Pane>
			),
		},
	];

	const couponsPanes = [
		{
			menuItem: 'Coupon actif',
			render: () => (
				<div className="coupon-list__cards">
					{initialState.map((el) => (
						<CouponCard
							key={el.id}
							url={el.url}
							img={el.img}
							amount={el.amount}
							date={el.date}
							points={el.points}
							available={el.available}
							title={el.title}
							active={el.active}
							couponInfos={el}
						/>
					))}
				</div>
			),
		},
	];

	return (
		<div className="brand-details">
			<div className="brand-slider-container">
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
								</div>
							))}
				</Slider>
				<div className="brand-image">
					<img src={arrayBufferToBase64(marque.data.logo.data)} alt="brand" />
				</div>
			</div>

			<div className="content description">
				<Tab
					className="toggle"
					menu={{ secondary: true, pointing: true, size: 'large', widths: 2 }}
					panes={panes}
				/>
			</div>

			<Divider hidden />

			<div className="content description coupons">
				<Tab
					className="toggle"
					menu={{ secondary: true, pointing: true, size: 'large', widths: 2 }}
					panes={couponsPanes}
				/>
			</div>
		</div>
	);
};

export default OfferDetails;
