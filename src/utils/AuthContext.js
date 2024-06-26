import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import firebaseApp from 'src/utils/initApp';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		firebaseApp.auth().onAuthStateChanged(setUser);
	}, []);

	return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
