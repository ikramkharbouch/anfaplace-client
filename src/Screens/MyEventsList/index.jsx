import React, { useEffect } from 'react';

import EventCard from 'src/Components/EventCard';
import './MyEventsList.less';
import { useDispatch, useSelector } from 'react-redux';
import { Dimmer, Loader, Button } from 'semantic-ui-react';
import { openPhoneAuth } from 'src/store/app';

const MyEventsList = () => {
	const dispatch = useDispatch();
	// eslint-disable-next-line no-unused-vars
	/* 	//const { list: myEventsList,  } = useSelector((state) => state.myEventsList);
	 */ const user = useSelector((state) => state.user.currentUser);
	const eventList = useSelector((state) => state.userEventsList);

	useEffect(() => {
		if (user && !eventList.success) {
			dispatch({ type: 'GET_USER_EVENTS' });
		}
	}, [user, eventList.events]);

	return eventList.loading && user ? (
		<Dimmer active>
			<Loader />
		</Dimmer>
	) : (
		<div id="my-events-screen">
			{eventList.events.length
				? eventList.events.map((event) => <EventCard key={event.id} event={event} hasParticipated />)
				: user && <p style={{ textAlign: 'center' }}> aucun evenement </p>}

			{!user && <p style={{ textAlign: 'center' }}> Merci de vous connecter ! </p>}

			{!user && (
				<div className="action" style={{ display: 'flex', justifyContent: 'center' }}>
					<Button
						circular
						onClick={() => {
							if (!user) {
								dispatch(openPhoneAuth(true));
							}
						}}
					>
						Activer mon compte
					</Button>
				</div>
			)}
		</div>
	);
};

export default MyEventsList;
