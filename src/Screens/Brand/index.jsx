/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Lightbox from 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';

// import 'antd/lib/image/style/css';
import { useParams } from 'react-router-dom';
import brandActions from 'src/store/brand/actions';

import { Button, Tab, Icon, Grid, Header, Divider, Dimmer, Loader, Image } from 'semantic-ui-react';
import Slider from 'src/Components/Slider';
import CouponCard from 'src/Components/CouponCard';
import brandSrc from 'src/assets/images/brands/GO_Sport_logo.svg';
import './Brand.less';
import { useSelector, useDispatch } from 'react-redux';
import { openPhoneAuth } from 'src/store/app';
import myEventsActions from 'src/store/myVisitedList/actions';
import Modal from 'src/Components/Modal';
import { openAddedNotification } from 'src/store/myVisitedList';

import plan1 from 'src/assets/pdf/plan Niveau 1 Mars 2021.pdf';
import plan2 from 'src/assets/pdf/plan Niveau 2 Mars 2021.pdf';
import plan3 from 'src/assets/pdf/plan Niveau 3 Mars 2021.pdf';
import planAnfa from 'src/assets/pdf/plan_Anfaplace_Mall.pdf';
import allMenus from './assets';

import plan1Img from 'src/assets/pdf/plan-Niveau-1-Mars-2021/plan Niveau 1 Mars 2021_page-0001.jpg';
import plan2Img from 'src/assets/pdf/plan-Niveau-2-Mars-2021/plan Niveau 2 Mars 2021_page-0001.jpg';
import plan3Img from 'src/assets/pdf/plan-Niveau-3-Mars-2021/plan Niveau 3 Mars 2021_page-0001.jpg';
import planAnfaImg1 from 'src/assets/pdf/plan-Anfaplace-Mall/plan_Anfaplace_Mall_page-0001.jpg';
import planAnfaImg2 from 'src/assets/pdf/plan-Anfaplace-Mall/plan_Anfaplace_Mall_page-0002.jpg';
import planAnfaImg3 from 'src/assets/pdf/plan-Anfaplace-Mall/plan_Anfaplace_Mall_page-0003.jpg';
import planAnfaImg4 from 'src/assets/pdf/plan-Anfaplace-Mall/plan_Anfaplace_Mall_page-0004.jpg';
import { openAuthModal } from 'src/store/shared/index';

import { restaurants } from './restaurants';

restaurants?.map((item, index) => ({
	...item,
	images: allMenus[index],
}));

const getPdfUrl = (stage) => {
	if (stage?.toLowerCase()?.includes('1')) return [plan2Img];
	if (stage?.toLowerCase()?.includes('2')) return [plan3Img];
	if (stage?.toLowerCase()?.includes('rdc')) return [plan1Img];
	return [planAnfaImg1, planAnfaImg2, planAnfaImg3, planAnfaImg4];
};

const panes = [
	{
		menuItem: 'Détails du magasin',
		render: ({
			brand,
			loadingAdd,
			planModalOpen,
			setPlanModalOpen,
			handleAddToVisited,
			isOpenLightBox,
			setIsOpenLightbox,
			images,
			onMovePrevRequest,
			onMoveNextRequest,
			onCloseRequest,
			photoIndex,
			handleOpenModal,
			user,
			pdfModalOpen,
			setPdfModalOpen,
		}) => (
			<Tab.Pane attached={false} className="brand-tab-content">
				<div className="brand-tab-infos">
					<div>
						<Icon size="large" name="sync" /> Niveau {brand.data.niveau}
					</div>
					<div className="phone-number">
						<Icon size="large" name="phone" />
						<a href={`tel:${brand.data.phone}`}>
							<span>Tél. {brand.data.phone}</span>
						</a>
					</div>
				</div>
				<div className="brand-tab-actions">
					<Grid padded={false}>
						<Grid.Row columns={16}>
							<Grid.Column width={16}>
								{!user?.list_visite?.includes(brand.data.nom) && (
									<>
										<Button
											loading={loadingAdd}
											icon="plus"
											onClick={handleOpenModal}
											content="Ajouter à la liste des visites"
											size="mini"
											inverted
										/>
										<Divider hidden />
									</>
								)}
								<div style={{ display: 'flex', gap: 10 }}>
									{!!restaurants?.find((current) =>
										brand.data.nom
											?.trim()
											?.toLocaleLowerCase()
											?.includes(current?.name?.trim()?.toLocaleLowerCase())
									) && (
										<>
											<Button
												inverted
												style={{ display: 'flex', alignItems: 'center' }}
												content="Menu"
												size="mini"
												onClick={() => setPdfModalOpen(true)}
											/>
										</>
									)}

									<Button
										style={{ display: 'flex', alignItems: 'center' }}
										// icon="eye"
										content="Plan"
										size="mini"
										onClick={() => setPlanModalOpen(true)}
									/>
								</div>

								<Divider hidden />
								<Modal open={pdfModalOpen} setOpen={(isOpen) => setPdfModalOpen(isOpen)}>
									<Slider autoplay={false} pagination={true} id="brand-details">
										{restaurants
											?.find((current) =>
												brand.data.nom
													?.trim()
													?.toLocaleLowerCase()
													?.includes(current?.name?.trim()?.toLocaleLowerCase())
											)
											?.images?.map((image) => (
												<Image
													style={{ width: '100%', objectFit: 'cover' }}
													key={image}
													src={image}
													alt={image}
												/>
											))}
									</Slider>
								</Modal>
								<Modal open={planModalOpen} setOpen={(isOpen) => setPlanModalOpen(isOpen)}>
									{getPdfUrl(brand.data.niveau) && getPdfUrl(brand.data.niveau).length > 0 && (
										<Slider autoplay={false} pagination={true} id="brand-details">
											{getPdfUrl(brand.data.niveau).map((image) => (
												<Image
													style={{ width: '100%', objectFit: 'cover' }}
													key={image}
													src={image}
													alt={image}
												/>
											))}
										</Slider>
									)}
								</Modal>
								{/* <a download target="_blank" rel="noreferrer" href = {getPdfUrl(brand.data.niveau)}>link pdf</a> */}
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
	const [successModal, setSuccessModal] = useState(false);
	const [pdfModalOpen, setPdfModalOpen] = useState(false);
	const [planModalOpen, setPlanModalOpen] = useState(false);

	const [isOpenLightbox, setIsOpenLightbox] = useState(true);
	const [photoIndex, setPhotoIndex] = useState(0);
	const [images, setImages] = useState([]);

	const marque = useSelector((state) => state.brand.brand);
	const user = useSelector((state) => state.user.currentUser);
	const dispatch = useDispatch();
	const loadingAdd = useSelector((state) => state.myVisitedList.loadingAdd);
	const addedSuccess = useSelector((state) => state.myVisitedList.success);

	const loadingBrand = useSelector((state) => state.brand.isLoadingBrand);
	const open = useSelector((state) => state.myVisitedList.openAddedNotif);
	const handleAddToVisited = () => {
		if (!user) {
			dispatch(openPhoneAuth(true));
		} else {
			dispatch({ type: myEventsActions.ADD_BRAND_TO_VISITED, payload: marque });
		}
	};

	const handleOpenModal = () =>
		!!user ? dispatch(openAddedNotification(true)) : dispatch(openAuthModal(true));

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

	useEffect(() => {
		console.warn("'I'll appear as a warning")
		if (marque) {
			const imgs = restaurants?.find((current) =>
				marque.data.nom
					?.trim()
					?.toLocaleLowerCase()
					?.includes(current?.name?.trim()?.toLocaleLowerCase())
			)?.images;
			if (imgs) {
				setImages(images);
			}
		}
	}, []);

	const onCloseRequest = () => setIsOpenLightbox(false);

	const onMovePrevRequest = () => setPhotoIndex((photoIndex + images.length - 1) % images.length);

	const onMoveNextRequest = () => setPhotoIndex((photoIndex + 1) % images.length);

	const handleCloseModal = () => {
		if (addedSuccess) {
			setSuccessModal(true);
		}
	};

	const loading = !marque;
	return loading ? (
		<Dimmer active>
			<Loader />
		</Dimmer>
	) : (
		<div className="brand-details">
			<>
				<Modal
					onUnmount={handleCloseModal}
					open={open}
					setOpen={(value) => dispatch(openAddedNotification(value))}
				>
					<p> Ajouter {marque.data.nom} à la liste de visite ? </p>
					<Button loading={loadingAdd} onClick={handleAddToVisited}>
						Confirmer{' '}
					</Button>
				</Modal>
				<Modal open={successModal} setOpen={() => setSuccessModal(false)}>
					<p> {marque.data.nom} ajouté avec succès ! </p>
					<Button onClick={() => setSuccessModal(false)}>Ok </Button>
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
						isOpenLightbox={isOpenLightbox}
						setIsOpenLightbox={setIsOpenLightbox}
						onCloseRequest={onCloseRequest}
						onMovePrevRequest={onMovePrevRequest}
						onMoveNextRequest={onMoveNextRequest}
						brand={marque}
						user={user}
						loadingAdd={loadingAdd}
						pdfModalOpen={pdfModalOpen}
						setPdfModalOpen={setPdfModalOpen}
						planModalOpen={planModalOpen}
						setPlanModalOpen={setPlanModalOpen}
						handleAddToVisited={handleAddToVisited}
						handleOpenModal={handleOpenModal}
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
