import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import myVisitedListActions from 'src/store/myVisitedList/actions';
import BrandsGrid from 'src/Components/BrandsGrid';
import { Dimmer, Loader, Button } from 'semantic-ui-react';
// import { openPhoneAuth } from 'src/store/app';
import { setLoadingVisitedList, setMyVisitedListSuccess } from 'src/store/myVisitedList';
import Empty from 'src/Components/Empty/index';
import firebaseApp from 'src/utils/initApp';
import { openAuthModal } from 'src/store/shared/index';

const MyVisitedList = () => {
	const dispatch = useDispatch();
	const { list: visitedList, loadingList } = useSelector((state) => state.myVisitedList);
	const user = useSelector((state) => state.user.currentUser);
	const { all: allBrands } = useSelector((state) => state.brand);

	useEffect(() => {
		if (user && allBrands?.length > 0) {
			dispatch(setLoadingVisitedList(true));
			(async () => {
				try {
					const db = firebaseApp.firestore();
					const { currentUser } = firebaseApp.auth();
					const userRef = db.collection('users').doc(currentUser?.uid);
					const userDoc = await userRef.get();
					if (userDoc.exists) {
						const userData = userDoc.data();

						const userList = userData?.list_visite || [];
						const userVisitedList =
							allBrands?.filter((x) => userList?.some((el) => el === x?.data?.nom)) || [];

						dispatch(setMyVisitedListSuccess(userVisitedList));
					}
				} catch (error) {
					console.log(error);
					dispatch({ type: 'FETCH_FAILED' });
				}
			})();
		}
	}, [user, allBrands]);

	console.log('------>', loadingList);
	return loadingList && user ? (
		<Dimmer active>
			<Loader />
		</Dimmer>
	) : (
		<div style={{ paddingTop: 70 }}>
			{visitedList.length ? <BrandsGrid brands={visitedList} /> : user && <Empty />}

			{!user && (
				<>
					<p style={{ textAlign: 'center' }}> Merci de vous connecter ! </p>
					<div className="action" style={{ display: 'flex', justifyContent: 'center' }}>
						<Button
							circular
							onClick={() => {
								if (!user) {
									dispatch(openAuthModal(true));
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
