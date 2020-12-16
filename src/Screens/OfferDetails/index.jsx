import React from 'react';
import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';
import { Label } from 'semantic-ui-react';
import BackButton from 'src/Components/BackButton/BackButton';
import './OfferDetails.less';

import img from './1.jpg';

const OfferDetails = () => (
	<div className="offer-details">
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
			DETAILICI TEXTE DETAIL DE L’OFFRE IPSUM LOREM DOLOR S’IL YA DES DETAILS MERHBA IPSUMO LOREM DOLOR
			DETAIL
			<br />
			<br />
			ICI TEXTE DETAIL DE L’OFFRE IPSUM LOREM DOLOR S’IL YA DES DETAILS MERHBA IPSUMO LOREM DOLOR
			DETAILICI TEXTE DETAIL DE L’OFFRE IPSUM LOREM DOLOR S’IL YA DES DETAILS MERHBA IPSUMO LOREM DOLOR
			DETAIL
		</p>
	</div>
);

export default OfferDetails;
