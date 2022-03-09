import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { openAuthModal } from 'src/store/shared/index';
import { Button, Input, Checkbox, Dimmer, Loader } from 'semantic-ui-react';
import { KafkaTimeSpentOnSelectingInterest } from 'src/utils/kafka/KafkaEvents';
import ScrollArea from 'react-scrollbar';
import {
	setInterestsIgnoredOnce,
	openModal,
	setInterestsConfirmed,
	checkInterest,
} from 'src/store/interests';
import Modal from '../Modal';
import './Intersts.less';

const interestsSelector = createSelector(
	(state) => state.interests.list,
	(_, filter) => filter,
	(interests, filter) =>
		interests.filter((interest) =>
			interest.data.nomInteret
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.trim()
				.toLowerCase()
				.includes(
					filter
						.trim()
						.normalize('NFD')
						.replace(/[\u0300-\u036f]/g, '')
						.toLowerCase()
				)
		)
);

const Interests = () => {
	const { interestsIgnoredOnce, loading } = useSelector((state) => state.interests);
	const dispatch = useDispatch();
	const [filter, setFilter] = useState('');
	const list = useSelector((state) => interestsSelector(state, filter));
	const open = useSelector((state) => state.interests.open && !state.interests.interestsConfirmed);
	const setOpen = (value) => dispatch(openModal(value));
	const [t0, setT0] = useState(0);
	const user = useSelector((state) => state.user.currentUser);

	const handleCheck = (event, data) => {
		if (data.checked) {
			const timeSpentOnSelectingInterest = new KafkaTimeSpentOnSelectingInterest(
				'123456',
				data.id,
				performance.now() - t0
			);
			timeSpentOnSelectingInterest.emitEvent();
		}
		dispatch(checkInterest(data));

		setT0(performance.now());
	};
	const scrollbarStyle = {
		height: 180,
		width: '95%',
		marginTop: 16,
	};

	useEffect(() => {
		// giving a better feel when opening the modal
		setTimeout(() => {
			setT0(performance.now());
		}, 200);
	}, [user, interestsIgnoredOnce]);

	return (
		<Modal
			open={open}
			setOpen={(isOpen) => {
				setOpen(isOpen);
				if (!user) dispatch(openAuthModal(true));
			}}
		>
			<Dimmer active={loading}>
				<Loader />
			</Dimmer>
			<p>Pour une meilleure expérience client, créez votre liste d’intérêt.</p>
			<h4>Vous pouvez configurer votre liste plus tard.</h4>

			<Input
				className="filter"
				placeholder="Filter"
				icon="search"
				value={filter}
				onChange={({ target: { value } }) => setFilter(value)}
			/>

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
				{list.map((interest) => (
					<Checkbox
						key={interest.index}
						id={interest.index}
						label={interest.data.nomInteret}
						onChange={handleCheck}
					/>
				))}

				{list.length < 1 && <p> pas de résultat trouvé ! </p>}
			</ScrollArea>
			<div className="actions">
				<Button
					className="later"
					onClick={() => {
						setOpen(false);
						dispatch(setInterestsIgnoredOnce('true'));
					}}
				>
					Plus tard
				</Button>
				<Button
					circular
					onClick={() => {
						setOpen(false);
						dispatch(setInterestsConfirmed(true));
					}}
				>
					Confirmer
				</Button>
			</div>
		</Modal>
	);
};
Interests.propTypes = {};

export default Interests;
