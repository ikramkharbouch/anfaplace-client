import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import myVisitedListActions from 'src/store/myVisitedList/actions';
import BrandsGrid from 'src/Components/BrandsGrid';
import { Dimmer, Loader , Button } from 'semantic-ui-react';
import { openNumberVerificationModal, openPhoneAuth } from 'src/store/app';


const MyVisitedList = () => {
	const dispatch = useDispatch();
	const { list: visitedList, loadingList } = useSelector((state) => state.myVisitedList);
	const user = useSelector((state) => state.user.currentUser);

	

	useEffect(() => {
		console.log(myVisitedListActions.FETCH_MY_VISITED_LIST);
		if (user && loadingList) {
			dispatch({ type: myVisitedListActions.FETCH_MY_VISITED_LIST });
		}
	}, [user, loadingList]);
	return (
		<div style={{ paddingTop: 70 }}>
			
			<Dimmer active={false}>
				<Loader />
			</Dimmer>

			{visitedList.length && user?.currentUser ? (
				<BrandsGrid brands={visitedList} />
			) : (
				user?.currentUser && <p style={{ textAlign: 'center' }}> Pas de marque visiter</p>
			)}

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

export default MyVisitedList;
