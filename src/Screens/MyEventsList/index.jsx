import React, { useEffect , useState } from 'react';

import EventCard from 'src/Components/EventCard';
import './MyEventsList.less';
import { useDispatch, useSelector } from 'react-redux';
import { Dimmer, Loader , Button } from 'semantic-ui-react';
import { openNumberVerificationModal, openPhoneAuth } from 'src/store/app';


const MyEventsList = () => {
	const dispatch = useDispatch();
	const [ loading ,  setLoading] = useState(true);
	// eslint-disable-next-line no-unused-vars
/* 	//const { list: myEventsList,  } = useSelector((state) => state.myEventsList);
 */	const user = useSelector((state) => state.user.currentUser);
	const eventList = useSelector((state) => state.userEventsList);


	useEffect(() => {
		if (user && !eventList.success) {
			dispatch( { type : 'GET_USER_EVENTS' });
		}

		if(eventList.success && !eventList.loading){
			console.log(eventList.events)
			setLoading(false)
		}
		setLoading(false)
	}, [user , eventList.events]);

	return loading ? (
		<Dimmer active>
			<Loader />
		</Dimmer>
	) : (
		<div id="my-events-screen">
			{eventList.events.length ? (
				eventList.events.map((event) => <EventCard key = { event.id } event={event} hasParticipated />)
			) : (
				user?.currentUser &&  <p style={{ textAlign: 'center' }}> aucun evenement </p>
			)}

			{ !user?.currentUser && <p style={{ textAlign: 'center' }}> Merci de vous connecter ! </p>}

			{ !user?.currentUser && <div className="action" style = {{ display: 'flex' , justifyContent: 'center' }} >
				<Button
					circular
					onClick={() => {
						if (user) {
							dispatch(openNumberVerificationModal(true));
						} else {
							dispatch(openPhoneAuth({ open: true, withEmail: true }));
						}
					}}
				>
					Activer mon compte
				</Button>
			</div> }
		</div>
	);
};

export default MyEventsList;
