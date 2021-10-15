import React, { useEffect } from 'react';

import EventCard from 'src/Components/EventCard';
import './MyEventsList.less';
import { useDispatch, useSelector } from 'react-redux';
import { Dimmer, Loader, Button } from 'semantic-ui-react';
import { openPhoneAuth } from 'src/store/app';
import Empty from 'src/Components/Empty/index';
import firebaseApp from 'src/utils/initApp';
import { getUserEvents } from 'src/store/userEvents/index';
import { GET_USER_EVENTS_FAIL, GET_USER_EVENTS_SUCCESS } from 'src/store/userEvents/actions';

const MyEventsList = () => {
	const dispatch = useDispatch();
	// eslint-disable-next-line no-unused-vars
	/* 	//const { list: myEventsList,  } = useSelector((state) => state.myEventsList);
	 */
	const user = useSelector((state) => state.user.currentUser);
	const eventList = useSelector((state) => state.userEventsList);
	const allEvents = useSelector((state) => state.event);

	// useEffect(() => {
	// 	if (user && !eventList.success) {
	// 		dispatch({ type: 'GET_USER_EVENTS' });
	// 	}
	// }, [user, eventList.events]);

	useEffect(() => {
		if (user && !allEvents?.loading && allEvents?.list?.length > 0) {
			// eslint-disable-next-line consistent-return
			(async () => {
				try {
					const db = firebaseApp.firestore();
					const { currentUser } = firebaseApp.auth();
					const userRef = db.collection('users').doc(currentUser?.uid);
					const userDoc = await userRef.get();
					if (userDoc.exists) {
						const userData = userDoc.data();
						const userEvents = userData?.mes_events || [];
						// console.log('userEvents' , userEvents)
						if (userEvents?.length < 1) {
							return dispatch(
								getUserEvents({ type: GET_USER_EVENTS_SUCCESS, payload: { success: true, events: [] } })
							);
						}

						const finalEvents = allEvents?.list?.filter((evt) => userEvents?.includes(evt?.id));
						dispatch(
							getUserEvents({
								type: GET_USER_EVENTS_SUCCESS,
								payload: { success: true, events: finalEvents },
							})
						);
					} else {
						return dispatch(
							getUserEvents({ type: GET_USER_EVENTS_FAIL, payload: { message: 'No user infos found !' } })
						);
					}
				} catch (error) {
					console.log(error);
					dispatch(getUserEvents({ type: GET_USER_EVENTS_FAIL, payload: { message: error.message } }));
				}
			})();
		}
	}, [user]);

	return eventList.loading && user ? (
		<Dimmer active>
			<Loader />
		</Dimmer>
	) : (
		<div id="my-events-screen">
			{eventList.events.length
				? eventList.events.map((event) => <EventCard key={event.id} event={event} hasParticipated />)
				: user && <Empty text="Aucun évènement prévu" />}

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
