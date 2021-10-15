import React, { useState } from 'react';
import { Button, Header, Divider } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import Modal from 'src/Components/Modal';

import './style.less';
import { useDispatch, useSelector } from 'react-redux';
import { openAuthModal , openUpdateTelModal , openAuthTelModal } from 'src/store/shared/index';
import firebaseApp from 'src/utils/initApp';

const Account = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { currentUser } = useSelector((state) => state.user);
	const [confirmModalOpen, setConfirmModalOpen] = useState(false);
	const [isDisconnecting, setIsDisconnecting] = useState(false);

	const logout = async () => {
		try {
			setIsDisconnecting(true);
			await firebaseApp.auth().signOut();
			setIsDisconnecting(false);
			setConfirmModalOpen(false);
		} catch (error) {
			console.log(error);
			setIsDisconnecting(false);
		}
	};

	if (!currentUser) {
		return (
			<div className="page-content">
				<Header as="h2" className="page-title" size="large">
					Merci de vous connecter
				</Header>
				<Divider />
				<Button onClick={() => dispatch(openAuthModal(true))} fluid circular className="mb-20">
					Se connecter
				</Button>
			</div>
		);
	}

	return (
		<>
			<div className="page-content">
				<Header as="h2" className="page-title" size="large">
					Mon compte
				</Header>
				<Divider />
				<Button onClick={() => history.push('/profile')} fluid circular className="mb-20">
					Mon profil
				</Button>
				<Button onClick={() => history.push('/coupon-list')} fluid circular>
					Mes coupons
				</Button>
				<Button onClick={() => history.push('/qrcode')} fluid circular>
					Mon QR Code
				</Button>
				{/* <Divider /> */}
				{!currentUser?.phoneNumber && (
					<Button fluid circular onClick={() => dispatch(openAuthTelModal(true))}>
						Ajouter le numéro de téléphone
					</Button>
				)}

				{!!currentUser?.phoneNumber && (
					<Button fluid circular onClick={() => dispatch(openUpdateTelModal(true))}>
						Mettre à jour son numéro de téléphone
					</Button>
				)}

				<Button fluid circular onClick={() => setConfirmModalOpen(true)}>
					Déconnexion
				</Button>
			</div>
			<Modal
				open={confirmModalOpen || isDisconnecting}
				setOpen={(isOpen) => setConfirmModalOpen(isOpen)}
			>
				<p>Voulez-vous vraiment vous déconnecter ?</p>
				<Divider hidden />
				<div className="d-flex" style={{ displa: 'flex', justifyContent: 'center' }}>
					<Button loading={isDisconnecting} circular onClick={logout}>
						Oui
					</Button>
					<div style={{ width: 20, height: 'auto' }} />
					<Button disabled={isDisconnecting} circular>
						Non
					</Button>
				</div>
			</Modal>
		</>
	);
};

export default Account;
