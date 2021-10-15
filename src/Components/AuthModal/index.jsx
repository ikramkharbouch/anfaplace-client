/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { openAuthModal } from 'src/store/shared';
import Modal from 'src/Components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from 'src/Components/LoginForm';
import RegisterForm from '../RegisterForm/index';

const AuthModal = () => {
	const dispatch = useDispatch();
	const { authModalOpen } = useSelector((state) => state.shared.auth);

	const [showRegisterForm, setShowRegisterForm] = useState(false);

	const displayModal = (state) => {
		dispatch(openAuthModal(state));
	};

	return (
		<Modal open={authModalOpen} setOpen={(isOpen) => displayModal(isOpen)}>
			{!showRegisterForm && <LoginForm onSuccess = { () => displayModal(false) } />}
			{showRegisterForm && <RegisterForm onSuccess = { () => displayModal(false) } />}

			{/* <Divider /> */}

			<p className="activate" onClick={() => setShowRegisterForm( prev => !prev )}>
                { !showRegisterForm && <> Pas de compte ? <span style={{ textDecoration: 'underline' }}>créez-en un</span> </>}
				{ showRegisterForm && <> Déjà un compte , <span style={{ textDecoration: 'underline' }}>connectez-vous</span> </> }
			</p>
		</Modal>
	);
};

export default AuthModal;
