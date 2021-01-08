import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { Parallax } from 'react-parallax';
import { Link, useHistory } from 'react-router-dom';
import { Label, Icon, Button, Header, Divider } from 'semantic-ui-react';
import BackButton from 'src/Components/BackButton/BackButton';
import SocialSharing from 'src/Components/SocialSharing';

import './EntertainmentDetails.less';

import Modal from 'src/Components/Modal';
import { openNumberVerificationModal, openPhoneAuth } from 'src/store/app';
// import img from './1.jpg';

const EntertainmentDetails = () => {
	const history = useHistory();

	const { contenuBoody, debutTime, finTime, image, tags, titre } = history.location.state;

	console.log({ contenuBoody, debutTime, finTime, image, tags, titre });

	const Tags = typeof tags === 'string' ? JSON.parse(tags) : tags;

	const [openConfirm, setOpenConfirm] = useState(false);
	const [confirmationProgress, setConfirmationInProgress] = useState(false);
	const [successParticipate, setSuccessParticipate] = useState();
	const [shareModalIsOpen, openShareModal] = useState(false);
	const user = useSelector((state) => state.user.currentUser);
	const dispatch = useDispatch();
	const isEligibleToActivate = !!user && !user.isAnonymous;
	// const handleParticipateConfirm = () => {};
	const handleConfirmParticipation = () => {
		setSuccessParticipate(true);
	};
	useEffect(() => {
		if (user && confirmationProgress) {
			setOpenConfirm(true);
		}
	}, [user]);
	return (
		<div className="offer-details">
			<Button
				circular
				color="blue"
				onClick={() => setOpenConfirm(true)}
				className="participate"
				icon="plus"
				content="PARTICIPER"
			/>

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
							<div className="points"> +500p</div>

							<div className="action">
								{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
								<span className="cancel" onClick={() => setOpenConfirm(false)}>
									Annuler
								</span>
								<Button onClick={handleConfirmParticipation} circular>
									Confirmer
								</Button>
							</div>
						</>
					)
				) : (
					<>
						<Header as="h1">Merci pour votre participation Vous avez gagné</Header>
						<div className="points"> +500p</div>

						<div className="action">
							{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
							<Header as="h1">à très bientôt </Header>
						</div>
					</>
				)}
			</Modal>
			<SocialSharing open={shareModalIsOpen} setOpen={openShareModal} />
			<Parallax bgImage={image} strength={200}>
				<div className="offer-details-header">
					<BackButton text={titre} />
					<Divider hidden />
					<Divider hidden />
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