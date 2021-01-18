/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import brandActions from 'src/store/brand/actions';

import { Button, Tab, Icon, Grid, Header, Divider, Dimmer, Loader } from 'semantic-ui-react';
import Slider from 'src/Components/Slider';
import CouponCard from 'src/Components/CouponCard';
import brandSrc from 'src/assets/images/brands/GO_Sport_logo.svg';
import './Brand.less';
import { useSelector, useDispatch } from 'react-redux';
import { openPhoneAuth } from 'src/store/app';
import myEventsActions from 'src/store/myVisitedList/actions';
import Modal from 'src/Components/Modal';
import { openAddedNotification } from 'src/store/myVisitedList';

const panes = [
	{
		menuItem: 'Détails du magasin',
		render: ({ brand, loadingAdd, handleAddToVisited, user }) => (
			<Tab.Pane attached={false} className="brand-tab-content">
				<div className="brand-tab-infos">
					<div>
						<Icon size="large" name="sync" /> Niveau {brand.data.niveau}
					</div>
					<div className="phone-number">
						<Icon size="large" name="phone" />
						<span>Tél. {brand.data.phone}</span>
					</div>
				</div>
				<div className="brand-tab-actions">
					<Grid padded={false}>
						<Grid.Row columns={16}>
							<Grid.Column width={16}>
								{!user?.list_visite.includes(brand.data.nom) && (
									<Button
										loading={loadingAdd}
										icon="plus"
										onClick={handleAddToVisited}
										content="Ajouter à la liste des visites"
										size="mini"
										inverted
									/>
								)}
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
			</Tab.Pane>
		),
	},
	{
		menuItem: 'À propos',
		render: ({ brand }) => (
			<Tab.Pane attached={false}>
				<Header as="h3">{brand.data.nom}</Header>
				<Header as="p">{brand.data.description}</Header>
			</Tab.Pane>
		),
	},
];

const OfferDetails = () => {
	const { id } = useParams();
	const marque = useSelector((state) => state.brand.brand);
	const user = useSelector((state) => state.user.currentUser);
	const dispatch = useDispatch();
	const loadingAdd = useSelector((state) => state.myVisitedList.loadingAdd);
	const loadingBrand = useSelector((state) => state.brand.isLoadingBrand);
	const open = useSelector((state) => state.myVisitedList.openAddedNotif);
	const handleAddToVisited = () => {
		if (!user) {
			dispatch(openPhoneAuth(true));
		} else {
			dispatch({ type: myEventsActions.ADD_BRAND_TO_VISITED, payload: marque });
		}
	};

	const couponsPanes = [
		{
			menuItem: 'Coupon actif',
			render: ({ coupon }) => (
				<div className="coupon-list__cards">
					<CouponCard
						url={'/coupon/' + coupon.index}
						img={coupon.logo}
						amount={coupon.point}
						date={coupon.fin_time}
						points={coupon.point}
						title={coupon.title}
					/>
				</div>
			),
		},
	];

	useEffect(() => {
		if (id) {
			dispatch({ type: brandActions.FETCH_BRAND_BY_ID, id });
		}
	}, [id]);
	const loading = !marque;
	return loading ? (
		<Dimmer active>
			<Loader />
		</Dimmer>
	) : (
		<div className="brand-details">
			<>
				<Modal open={open} setOpen={(value) => dispatch(openAddedNotification(value))}>
					<p>Marque {marque.data.nom} ajouter a la list de visite </p>
					<Button onClick={() => dispatch(openAddedNotification(false))}>Confirmer </Button>
				</Modal>
				<div className="brand-slider-container">
					<Slider pagination={false} id="brand-details">
						{marque &&
							marque?.data?.slider_elements
								.filter((slider) => slider.show)
								.map((slider) => (
									<div id={slider.id_element} key={slider.id_element} className="slide-brand">
										<img alt={slider.titre} className="slider-image" src={slider.content} />
									</div>
								))}
					</Slider>
				</div>
				<div className="content description">
					<Tab
						brand={marque}
						user={user}
						loadingAdd={loadingAdd}
						handleAddToVisited={handleAddToVisited}
						className="toggle"
						menu={{ secondary: true, pointing: true, size: 'large', widths: 2 }}
						panes={panes}
					/>
				</div>
				{Object.keys(marque.coupon).length > 0 && (
					<>
						<Divider hidden />
						<div className="content description coupons">
							<Tab
								className="toggle"
								menu={{ secondary: true, pointing: true, size: 'large', widths: 2 }}
								coupon={{
									...marque.coupon.coupon_infos,
									index: marque.coupon.index,
									logo: marque.data.logo,
								}}
								panes={couponsPanes}
							/>
						</div>
					</>
				)}
			</>
		</div>
	);
};

export default OfferDetails;
