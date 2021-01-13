import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

import { Parallax } from 'react-parallax';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Label, Icon, Button, Header, Divider } from 'semantic-ui-react';

import Slider from 'src/Components/Slider';

// import BackButton from 'src/Components/BackButton/BackButton';
import SocialSharing from 'src/Components/SocialSharing';

import './EntertainmentDetails.less';

import Modal from 'src/Components/Modal';
import { openNumberVerificationModal, openPhoneAuth } from 'src/store/app';
// import img from './1.jpg';
// import defaultImage from './1.jpg';

/* const TOKEN = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjVmOTcxMmEwODczMTcyMGQ2NmZkNGEyYTU5MmU0ZGZjMmI1ZGU1OTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXBhZGV2LWFmMmYzIiwiYXVkIjoiYXBhZGV2LWFmMmYzIiwiYXV0aF90aW1lIjoxNjEwMjc1MDM3LCJ1c2VyX2lkIjoibkJ5SWFiV25GT1NPNHpLekhtenYyNWp0MVRWMiIsInN1YiI6Im5CeUlhYlduRk9TTzR6S3pIbXp2MjVqdDFUVjIiLCJpYXQiOjE2MTAzNzQ3ODYsImV4cCI6MTYxMDM3ODM4NiwicGhvbmVfbnVtYmVyIjoiKzIxMjYxODI2NDQ5MyIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzIxMjYxODI2NDQ5MyJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.cfQs5Q0sNfES5hpv8e1WTNdL8TDDtVQajWvw4mAb-J8nE-uEkqNt6UPBAn7WsS2ZFji5OXH1thCSSEw2IVV4BUkuweDYej91nDYQr26TEt1y_cBQhM04eb_6pH31q6M879OrtBR5eqC6e8NgWQS3BHcWpZ-xqnePKJt7GYQG-vGt47uhhvPCs1EaNUdSpVZC0O_luKuXKQiBWhtH2skRATMKYJ1CMK3i62mh05r2hVqSaZgYMlb2ZOpW_W4kpy_Jp34nJLn8X1NpTOnbdLbULeYJ2BKGfeJOSwXbMSdMWPDVWjL2szHC5VhUT4LhjoRThE2m9R413smYWV4FA6k2PQ"
 */ const EntertainmentDetails = () => {
	const history = useHistory();

	const { id: eventID } = useParams();

	// eslint-disable-next-line prettier/prettier
	// eslint-disable-next-line camelcase
	const {
		contenuBoody,
		debutTime,
		finTime,
		tags,
		titre,
		// eslint-disable-next-line camelcase
		slider_elements,
		points,
	} = history.location.state;

	const Tags = typeof tags === 'string' ? JSON.parse(tags) : tags;

	const [openConfirm, setOpenConfirm] = useState(false);
	const [confirmationProgress, setConfirmationInProgress] = useState(false);
	const [successParticipate, setSuccessParticipate] = useState();
	const [shareModalIsOpen, openShareModal] = useState(false);

	const [loading, setLoading] = useState(false);
	const [showParticipateBtn, setShowParticipateBtn] = useState(true);

	const user = useSelector((state) => state.user.currentUser);
	const participateToEventState = useSelector((state) => state.participateToEvent);
	const participatedEvents = useSelector((state) => state.userEventsList.events);
	const dispatch = useDispatch();
	const isEligibleToActivate = !!user && !user.isAnonymous;
	// const handleParticipateConfirm = () => {};
	const handleConfirmParticipation = async () => {
		dispatch({ type: 'ADD_EVENT_TO_PARTICIPATED', payload: { idEvent: eventID } });
		setLoading(true);
	};

	const handleParticipateRequest = (state) => {
		if (state.success && !state.loading) {
			console.log(state);
			setSuccessParticipate(true);
			setLoading(state.loading);
			setShowParticipateBtn(false);
			dispatch({ type: 'UPDATE_USER_POINTS', points: state.totalPoints });
		}

		if (!state.success && !state.loading) {
			alert('error');
			setLoading(state.loading);
		}
	};

	useEffect(() => {
		console.log('user', points);
		if (user && confirmationProgress) {
			setOpenConfirm(true);
		}

		handleParticipateRequest(participateToEventState);

		console.log(
			'participatedEvents',
			participatedEvents.some((event) => event.id === eventID)
		);

		setShowParticipateBtn(participatedEvents.some((event) => event.id === eventID));
	}, [user, participateToEventState]);
	return (
		<div className="offer-details">
			{!showParticipateBtn && (
				<Button
					circular
					color="blue"
					onClick={() => setOpenConfirm(true)}
					// onClick = {handleParticipate}
					className="participate"
					icon="plus"
					content="PARTICIPER"
				/>
			)}

			<Modal className="participate-confirmation" open={openConfirm} setOpen={setOpenConfirm}>
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
										setOpenConfirm(false);
										if (user) {
											dispatch(openNumberVerificationModal(true));
										} else {
											dispatch(openPhoneAuth({ open: true, withEmail: true }));
										}
									}}
								>
									Activer mon compte
								</Button>
							</div>
						</>
					) : (
						<>
							<Header as="h1">Confirmer votre participation à cet évènement et gagner</Header>
							<div className="points"> +{points}p</div>

							<div className="action">
								{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
								<span className="cancel" onClick={() => setOpenConfirm(false)}>
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
						<div className="points"> +{points}p </div>

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
					{console.log(slider_elements)}
					{slider_elements.map((x) => (
						<img src={x.content} alt="" style={{ height: '60vh', objectFit: 'cover', width: '100%' }} />
					))}
				</Slider>

				<div className="offer-details-header">
					<Divider hidden />
					<Header as="h3"> {titre} </Header>
					<p>
						{dayjs(debutTime, 'DD/MM/YYYY').format('D MMM')} -{' '}
						{dayjs(finTime, 'DD/MM/YYYY').format('D MMM')}
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
			<div className="description" dangerouslySetInnerHTML={{ __html: contenuBoody }} />
		</div>
	);
};

export default EntertainmentDetails;
