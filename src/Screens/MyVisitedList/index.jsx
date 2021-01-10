import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import myVisitedListActions from 'src/store/myVisitedList/actions';
import BrandsGrid from 'src/Components/BrandsGrid';
import { Dimmer, Loader } from 'semantic-ui-react';

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
			<Dimmer active={loadingList}>
				<Loader />
			</Dimmer>
			{visitedList.length ? (
				<BrandsGrid brands={visitedList} />
			) : (
				<p style={{ textAlign: 'center' }}> Pas de marque visiter</p>
			)}
		</div>
	);
};

export default MyVisitedList;
