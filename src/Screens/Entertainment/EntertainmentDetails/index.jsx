import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { Parallax } from 'react-parallax';
import { Link, useParams } from 'react-router-dom';
import { RESET_EVENT_TO_PARTICIPATED_STATE , ADD_EVENT_TO_PARTICIPATED } from 'src/store/participatedEvent/actions';
import { Label, Icon, Button, Header, Divider } from 'semantic-ui-react';

import Slider from 'src/Components/Slider';

import SocialSharing from 'src/Components/SocialSharing';

import './EntertainmentDetails.less';

import Modal from 'src/Components/Modal';
import { openPhoneAuth } from 'src/store/app';
import { setOpenConfirm } from 'src/store/participatedEvent';

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
	const [confirmationProgress, setConfirmationInProgress] = useState(false);
	const [successParticipate, setSuccessParticipate] = useState();
	const [shareModalIsOpen, openShareModal] = useState(false);

	const loading = useSelector((state) => state.participateToEvent.loading);
	const [showParticipateBtn, setShowParticipateBtn] = useState(true);

	const user = useSelector((state) => state.user.currentUser);
	const participateToEventState = useSelector((state) => state.participateToEvent);
	const participatedEvents = useSelector((state) => state.user?.currentUser?.mes_events);
	const dispatch = useDispatch();
	const isEligibleToActivate = !!user && !user.isAnonymous;
	// const handleParticipateConfirm = () => {};
	const handleConfirmParticipation = () => {
		dispatch({ type: ADD_EVENT_TO_PARTICIPATED , payload: { idEvent: eventID } });
	};

	const handleParticipateRequest = (state) => {
		if (state.success && !state.loading) {
			setSuccessParticipate(true);
			setShowParticipateBtn(false);
		}
	};

	useEffect(() => {
		if (user && confirmationProgress) {
			setOpenConfirm(true);
		}
		
		handleParticipateRequest(participateToEventState);

		if (participatedEvents) {
			setShowParticipateBtn(participatedEvents.includes(eventID));
		}

		return () => {
			dispatch({ type: RESET_EVENT_TO_PARTICIPATED_STATE })
		}


	}, [user, participateToEventState.success]);
	return (
		<div className="offer-details">
			{!showParticipateBtn && (
				<Button
					circular
					color="blue"
					onClick={() => dispatch(setOpenConfirm(true))}
					// onClick = {handleParticipate}
					className="participate"
					icon="plus"
					content="PARTICIPER"
				/>
			)}

{ console.log('successParticipate' , successParticipate) }


			<Modal
				className="participate-confirmation"
				open={openConfirm}
				setOpen={(value) => dispatch(setOpenConfirm(value))}
			>
				{/* eslint-disable-next-line no-nested-ternary */}
				{!successParticipate ? (
					!isEligibleToActivate ? (
						<>
							<Header as="h1">
								Activer votre compte <br /> et gagner 50 points en participant à cet évènement
							</Header>
							<div className="action">
								<Button
									circular
									onClick={() => {
										setConfirmationInProgress(true);
										dispatch(setOpenConfirm(false));
										if (!user) {
											dispatch(openPhoneAuth(true));
										}
										// if (user) {
										// 	dispatch(openNumberVerificationModal(true));
										// } else {
										// 	dispatch(openPhoneAuth({ open: true, withEmail: true }));
										// }
									}}
								>
									Activer mon compte
								</Button>
							</div>
						</>
					) : (
						<>
							<Header as="h1">Confirmer votre participation à cet évènement et gagner</Header>
							<div className="points"> +{event.points}p</div>

							<div className="action">
								{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
								<span className="cancel" onClick={() => dispatch(setOpenConfirm(false))}>
									Annuler
								</span>
								<Button onClick={handleConfirmParticipation} circular loading={loading}>
									Confirmer
								</Button>
							</div>
						</>
					)
				) : (
					<>
						<Header as="h1">Merci pour votre participation Vous avez gagné</Header>
						<div className="points"> +{event.points}p </div>

						<div className="action">
							{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
							<Header as="h1">à très bientôt </Header>
						</div>
					</>
				)}
			</Modal>
			<SocialSharing open={shareModalIsOpen} setOpen={openShareModal} />
			<Parallax strength={200}>
				<Slider
					className="slider"
					timeOnSliderEvent={(value) => console.log(value)}
					timeToReachEndOfSlider={(value) => console.log(value)}
					id="offers"
				>
					{console.log(event.slider_elements)}
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
