import React, { useState, useContext } from 'react';
import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';
import { Label, Icon, Button, Confirm } from 'semantic-ui-react';
import BackButton from 'src/Components/BackButton/BackButton';
import SocialSharing from 'src/Components/SocialSharing';
import { AuthContext } from 'src/utils/AuthContext';

import './OfferDetails.less';

import img from './1.jpg';

const OfferDetails = () => {
	const [openConfirm, setOpenConfirm] = useState(false);
	const [shareModalIsOpen, openShareModal] = useState(false);
	const { user } = useContext(AuthContext);
	const showParticipateButton = !!user && !user.isAnonymous;
	const handleParticipateConfirm = () => {};
	return (
		<div className="offer-details">
			{showParticipateButton && (
				<Button
					circular
					color="blue"
					onClick={() => setOpenConfirm(true)}
					className="participate"
					icon="plus"
					content="PARTICIPER"
				/>
			)}
			<Confirm
				open={openConfirm}
				content={`Hello ${user ? user.displayName : ''} , vous voulez participer à cet evènement ?`}
				cancelButton="Annuler"
				confirmButton="Confirmer"
				onCancel={() => setOpenConfirm(false)}
				onConfirm={handleParticipateConfirm}
			/>
			<SocialSharing open={shareModalIsOpen} setOpen={openShareModal} />
			<Parallax bgImage={img} strength={200}>
				<div className="offer-details-header">
					<BackButton text="LA NOUVELLE PLATEFORME ANFA PLACE IPSUM LOREM" />
					<p>08 DÉC - 12 DÉC</p>
					<div className="offer-details-tags">
						<Link to="/">
							<Label color="white">Tag</Label>
						</Link>
						<Link to="/">
							<Label>Tag</Label>
						</Link>
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
			<p className="description">
				ICI TEXTE DETAIL DE L’OFFRE IPSUM LOREM DOLOR S’IL YA DES DETAILS MERHBA IPSUMO LOREM DOLOR
				DETAIL
				<br />
				<br />
				ICI TEXTE DETAIL DE L’OFFRE IPSUM LOREM DOLOR S’IL YA DES DETAILS MERHBA IPSUMO LOREM DOLOR
				DETAIL
				<br />
				<br />
				ICI TEXTE DETAIL DE L’OFFRE IPSUM LOREM DOLOR S’IL YA DES DETAILS MERHBA IPSUMO LOREM DOLOR
				DETAILICI TEXTE DETAIL DE L’OFFRE IPSUM LOREM DOLOR S’IL YA DES DETAILS MERHBA IPSUMO LOREM
				DOLOR DETAIL
				<br />
				<br />
				ICI TEXTE DETAIL DE L’OFFRE IPSUM LOREM DOLOR S’IL YA DES DETAILS MERHBA IPSUMO LOREM DOLOR
				DETAILICI TEXTE DETAIL DE L’OFFRE IPSUM LOREM DOLOR S’IL YA DES DETAILS MERHBA IPSUMO LOREM
				DOLOR DETAIL
			</p>
		</div>
	);
};

export default OfferDetails;
