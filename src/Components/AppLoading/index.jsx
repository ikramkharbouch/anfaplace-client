import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import SplashScreen from '../SplashScreen/index';

const AppLoading = ({ children }) => {
	const { loading: articlesLoading } = useSelector((state) => state.articles);
	const { loadingUser } = useSelector((state) => state.user);
	// const { loading: branbdsLoading } = useSelector((state) => state.brand);
	// const { loading: EventsLoading } = useSelector((state) => state.brand);
	// const { loading: interestsLoading } = useSelector((state) => state.interests);

	useEffect(() => {
		if (loadingUser) {
			document.querySelector('body').classList.add('overflow-hidden');
		} else {
			document.querySelector('body').classList.remove('overflow-hidden');
		}
	}, [articlesLoading, loadingUser]);

	return (
		<>
			{loadingUser && <SplashScreen />}
			{children}
		</>
	);
};

AppLoading.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AppLoading;
