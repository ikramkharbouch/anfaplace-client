import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { Parallax } from 'react-parallax';
import { Link, useParams } from 'react-router-dom';
import { ADD_EVENT_TO_PARTICIPATED } from 'src/store/participatedEvent/actions';
import { Label, Icon, Button, Header, Divider } from 'semantic-ui-react';

import Slider from 'src/Components/Slider';

import SocialSharing from 'src/Components/SocialSharing';

import './EntertainmentDetails.less';

import Modal from 'src/Components/Modal';
import { openPhoneAuth } from 'src/store/app';
import { setOpenConfirm } from 'src/store/participatedEvent';
import UserInfoModal from 'src/Components/userInfoModal';

const selectEvent = createSelector(
	(state) => state.event.list,
	(_, id) => id,
	(events, id) => events.find((event) => event.id === id).data
);

const EntertainmentDetails = () => {
	const { id: eventID } = useParams();
	const event = useSelector((state) => selectEvent(state, eventID));

	// eslint-disable-next-line prettier/prettier
	// eslint-disable-next-line camelcase

	const Tags = event.tag;

	const openConfirm = useSelector((state) => state.participateToEvent.openConfirm);
	// eslint-disable-next-line no-unused-vars
	const [confirmationProgress, setConfirmationInProgress] = useState(false);
	const [shareModalIsOpen, openShareModal] = useState(false);

	const loading = useSelector((state) => state.participateToEvent.loading);
	const [showParticipateBtn, setShowParticipateBtn] = useState(true);
	const [openUserInfo, setUserOpenInfo] = useState(false);
	const user = useSelector((state) => state.user.currentUser);
	const userInfo = useSelector((state) => state.user.userInfo);
	const participatedEvents = useSelector((state) => state.user?.currentUser?.mes_events);
	const dispatch = useDispatch();
	// const handleParticipateConfirm = () => {};
	const handleConfirmParticipation = () => {
		setConfirmationInProgress(true);
		dispatch({ type: ADD_EVENT_TO_PARTICIPATED, payload: { idEvent: eventID } });
	};

	useEffect(() => {
		if (participatedEvents) {
			setShowParticipateBtn(!participatedEvents.includes(eventID) && event.points);
		}
	}, [user]);
	return (
		<div className="offer-details">
			{showParticipateBtn && (
				<Button
					circular
					color="blue"
					onClick={() => {
						setConfirmationInProgress(true);
						if (user) {
							if (!userInfo.email && !userInfo.nom) {
								setUserOpenInfo(true);
							} else {
								dispatch(setOpenConfirm(true));
							}
						} else {
							dispatch(openPhoneAuth(true));
						}
					}}
					// onClick = {handleParticipate}
					className="participate"
					icon="plus"
					content="Je m'inscris"
				/>
			)}
			<UserInfoModal
				open={openUserInfo}
				confirmUserInfo={() => {
					setUserOpenInfo(false);
					dispatch(setOpenConfirm(true));
				}}
				setOpen={setUserOpenInfo}
			/>

			<Modal
				className="participate-confirmation"
				open={openConfirm}
				setOpen={(value) => dispatch(setOpenConfirm(value))}
			>
				{/* eslint-disable-next-line no-nested-ternary */}
				{
					<>
						<Header as="h1">Merci pour votre inscription , Vous avez gagner</Header>
						<div className="points"> +{event.points}p</div>

						<div className="action">
							<Button onClick={handleConfirmParticipation} circular loading={loading}>
								Fermer
							</Button>
							{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
						</div>
					</>
				}
			</Modal>
			<SocialSharing open={shareModalIsOpen} setOpen={openShareModal} />
			<Parallax strength={200}>
				<Slider className="slider" id="offers">
					{event.slider_elements.map((x) => (
						<img src={x.content} alt="" style={{ height: '60vh', objectFit: 'cover', width: '100%' }} />
					))}
				</Slider>

				<div className="offer-details-header">
					<Divider hidden />
					<Header as="h3"> {event.titre} </Header>
					<p>
						{dayjs(event.debut_time, 'DD/MM/YYYY').format('D MMM')} -{' '}
						{dayjs(event.fin_time, 'DD/MM/YYYY').format('D MMM')}
					</p>
					<div className="offer-details-tags">
						{Tags.map((tag) => (
							<Link to="/">
								<Label color="white" key={tag}>
									{' '}
									{tag}{' '}
								</Label>
							</Link>
						))}
					</div>
					<div className="share-button">
						<Label onClick={() => openShareModal(true)} icon color="blue">
							<Icon name="share" />
							PARTAGER
						</Label>
					</div>
				</div>
				<div className="parallax-content" />
			</Parallax>
			<div className="description" dangerouslySetInnerHTML={{ __html: event.contenu_body }} />
		</div>
	);
};

export default EntertainmentDetails;
