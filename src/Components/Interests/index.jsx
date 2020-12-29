import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Input } from 'semantic-ui-react';
import { KafkaTimeSpentOnSelectingInterest } from 'src/utils/kafka/KafkaEvents';
import ScrollArea from 'react-scrollbar';
import { AuthContext } from 'src/utils/AuthContext';

import Modal from '../Modal';
import './Intersts.less';

const interests = [
	{ id: 1, label: 'Vetements homme' },
	{ id: 1, label: 'Vetement femme' },
	{ id: 2, label: 'Chaussures homme' },
	{ id: 3, label: 'Chassures femmes' },
	{ id: 4, label: 'Maquillage/Parfumerie' },
	{ id: 5, label: 'Food' },
	{ id: 1, label: 'Maison / Décoration' },
	{ id: 6, label: 'Sport Enfants' },
];

const Interests = ({ modalClosedEvent }) => {
	const interestsIgnoredOnce = JSON.parse(localStorage.getItem('interestsIgnoredOnce')) || false;
	const [open, setOpen] = useState(false);
	const [t0, setT0] = useState(0);
	const { user } = useContext(AuthContext);

	const handleCheck = (event, data) => {
		if (data.checked) {
			const timeSpentOnSelectingInterest = new KafkaTimeSpentOnSelectingInterest(
				'123456',
				data.id,
				performance.now() - t0
			);
			timeSpentOnSelectingInterest.emitEvent();
		}

		setT0(performance.now());

		console.log({ data, t0 });
	};
	const scrollbarStyle = {
		height: 180,
		width: '95%',
		marginTop: 16,
	};
	useEffect(() => {
		// giving a better feel when opening the modal
		setTimeout(() => {
			setOpen(!interestsIgnoredOnce);
			setT0(performance.now());
		}, 200);
	}, [interestsIgnoredOnce]);
	return (
		<Modal
			open={open}
			setOpen={(isOpen) => {
				setOpen(isOpen);
				modalClosedEvent(user == null);
			}}
		>
			<p>Pour une meilleure expérience client, créer votre liste d’intérêt.</p>
			<h4>Vous pouvez configurer votre liste plus tard.</h4>

			<Input className="filter" placeholder="Filter" icon="search" />

			<ScrollArea
				speed={0.8}
				style={scrollbarStyle}
				className="interests"
				verticalContainerStyle={{
					zIndex: 10002,
					backgroundColor: 'rgba(255,255,255,.2)',
					width: 3,
					opacity: 1,
				}}
				verticalScrollbarStyle={{
					borderRadius: 80,
					backgroundColor: '#00A0E3',
					zIndex: 10003,
					width: 3,
				}}
				horizontal={false}
			>
				{interests.map((interest) => (
					<Checkbox id={interest.id} label={interest.label} onChange={handleCheck} />
				))}
			</ScrollArea>
			<div className="actions">
				<Button
					className="later"
					onClick={() => {
						setOpen(false);
						localStorage.setItem('interestsIgnoredOnce', 'true');
						modalClosedEvent(user == null);
					}}
				>
					Plus tard
				</Button>
				<Button
					circular
					onClick={() => {
						setOpen(false);
						modalClosedEvent(user == null);
						localStorage.setItem('interests-confirmed', 'true');
					}}
				>
					Confirmer
				</Button>
			</div>
		</Modal>
	);
};
Interests.propTypes = {
	modalClosedEvent: PropTypes.func.isRequired,
};

export default Interests;
