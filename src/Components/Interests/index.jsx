import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input, Checkbox } from 'semantic-ui-react';
import { KafkaTimeSpentOnSelectingInterest } from 'src/utils/kafka/KafkaEvents';
import ScrollArea from 'react-scrollbar';
import { AuthContext } from 'src/utils/AuthContext';
import { setInterestsIgnoredOnce } from 'src/store/interests';

import Modal from '../Modal';
import './Intersts.less';

const Interests = () => {
	const { interestsIgnoredOnce, list } = useSelector((state) => state.interests);
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [t0, setT0] = useState(0);
	const { user } = useContext(AuthContext);

	const [interstList, setInterestList] = useState(list || []);

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
	};
	const scrollbarStyle = {
		height: 180,
		width: '95%',
		marginTop: 16,
	};

	const handleSearch = (e) => {
		const array = list.filter((x) =>
			x.label
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.trim()
				.toLowerCase()
				.includes(
					e.target.value
						.trim()
						.normalize('NFD')
						.replace(/[\u0300-\u036f]/g, '')
						.toLowerCase()
				)
		);
		setInterestList(array);
	};

	useEffect(() => {
		// giving a better feel when opening the modal
		setTimeout(() => {
			setOpen(!user || !interestsIgnoredOnce);
			setT0(performance.now());
		}, 200);
	}, [user, interestsIgnoredOnce]);

	return (
		<Modal
			open={open}
			setOpen={(isOpen) => {
				setOpen(isOpen);
			}}
		>
			{console.log(interstList)}
			<p>Pour une meilleure expérience client, créer votre liste d’intérêt.</p>
			<h4>Vous pouvez configurer votre liste plus tard.</h4>

			<Input className="filter" placeholder="Filter" icon="search" onChange={handleSearch} />

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
				{interstList.map((interest) => (
					<Checkbox
						key={interest.label}
						id={interest.id}
						label={interest.label}
						handleCheck={handleCheck}
					/>
				))}

				{interstList.length < 1 && <p> pas de résultat trouvé ! </p>}
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
						localStorage.setItem('interests-confirmed', 'true');
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
