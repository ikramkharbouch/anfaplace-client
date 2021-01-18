import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import myVisitedListActions from 'src/store/myVisitedList/actions';
import BrandsGrid from 'src/Components/BrandsGrid';
import { Dimmer, Loader, Button } from 'semantic-ui-react';
import { openPhoneAuth } from 'src/store/app';
import { setLoadingVisitedList } from 'src/store/myVisitedList';

const MyVisitedList = () => {
	const dispatch = useDispatch();
	const { list: visitedList, loadingList } = useSelector((state) => state.myVisitedList);
	const user = useSelector((state) => state.user.currentUser);

	useEffect(() => {
		if (user) {
			dispatch(setLoadingVisitedList(true));
			dispatch({ type: myVisitedListActions.FETCH_MY_VISITED_LIST });
		}
	}, [user]);

	console.log('------>', loadingList);
	return loadingList && user ? (
		<Dimmer active>
			<Loader />
		</Dimmer>
	) : (
		<div style={{ paddingTop: 70 }}>
			{visitedList.length ? (
				<BrandsGrid brands={visitedList} />
			) : (
				user && <p style={{ textAlign: 'center' }}> Pas de marque visiter</p>
			)}

			{!user && (
				<>
					<p style={{ textAlign: 'center' }}> Merci de vous connecter ! </p>
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
				</>
			)}
		</div>
	);
};

export default MyVisitedList;
