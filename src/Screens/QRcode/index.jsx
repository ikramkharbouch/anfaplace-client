import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Header , Divider } from 'semantic-ui-react';
import './QRcode.less';
// import { openNumberVerificationModal, openPhoneAuth } from 'src/store/app';
import QrCodeComponent from 'src/Components/qrCode';
import { openAuthModal } from 'src/store/shared/index';

const PhoneValidated = () => {
	const { points, qrCode } = useSelector((state) => state.user.currentUser);

	return (
		<div className="qrcode-section">
			<div className="qrcode-section-header" />
			<div className="qrcode-section-title">
				<h3> Votre QR Code est activé </h3>
			</div>
			<div className="qrcode-section-body">
				<div className="qrcode-section-img">
					<QrCodeComponent qrCodeImg={qrCode} />
				</div>

				<span className="qrcode-points"> {points} points </span>
			</div>
		</div>
	);
};

// const PhoneNotValidated = () => {
// 	const user = useSelector((state) => state.user.currentUser);
// 	const dispatch = useDispatch();
// 	useEffect(() => {
// 		if (user) {
// 			if (user.multiFactor.enrolledFactors === 0) {
// 				dispatch(openNumberVerificationModal(true));
// 			}
// 		}
// 	}, [user]);
// 	return (
// 		<>
// 			<div className="qrcode-screen">
// 				<div className="content">
// 					<Header as="h2">Votre QR Code n’est pas actif</Header>
// 					<p>Activer votre QR CODE et profiter des remises instantanées en magasin</p>
// 					<Icon className="big" name="qrcode" />
// 				</div>

// 				<Button
// 					onClick={() => {
// 						if (user) {
// 							if (user.multiFactor.enrolledFactors.length === 0) {
// 								dispatch(openNumberVerificationModal(true));
// 							}
// 						} else {
// 							dispatch(openPhoneAuth(true));
// 						}
// 					}}
// 					circular
// 					className="activate"
// 				>
// 					Activer
// 				</Button>
// 			</div>
// 		</>
// 	);
// };

const QRcode = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.currentUser);
	return user ? <PhoneValidated /> : (
		<div className = 'page-content'>
		<Header as = 'h2' className = 'page-title' size='large'>Merci de vous connecter</Header>
		<Divider />
		<Button onClick = { () => dispatch(openAuthModal(true)) }  fluid circular className = 'mb-20' >
			Se connecter
		</Button>
	</div>
	);
};

export default QRcode;
