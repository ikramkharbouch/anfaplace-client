import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Header, Icon } from 'semantic-ui-react';
import './QRcode.less';
import { openNumberVerificationModal, openSocialAuth } from 'src/store/app';

const PhoneValidated = () => (
	<div className="qrcode-section">
		<div className="qrcode-section-header" />
		<div className="qrcode-section-title">
			<h3> Votre QR Code est activé </h3>
		</div>
		<div className="qrcode-section-body">
			<div className="qrcode-section-img">
				<Icon className="big" name="qrcode" />
			</div>

			<span className="qrcode-points"> 350 points </span>
		</div>
	</div>
);

const PhoneNotValidated = () => {
	const user = useSelector((state) => state.user.currentUser);
	const dispatch = useDispatch();
	useEffect(() => {
		if (user) {
			if (user.multiFactor.enrolledFactors === 0) {
				dispatch(openNumberVerificationModal(true));
			}
		}
	}, [user]);
	return (
		<>
			<div className="qrcode-screen">
				<div className="content">
					<Header as="h2">Votre QR Code n’est pas actif</Header>
					<p>Activer votre QR CODE et profiter des remises instantanées en magasin</p>
					<Icon className="big" name="qrcode" />
				</div>

				<Button
					onClick={() => {
						if (user) {
							if (user.multiFactor.enrolledFactors.length === 0) {
								dispatch(openNumberVerificationModal(true));
							}
						} else {
							dispatch(openSocialAuth({ open: true, withEmail: true }));
						}
					}}
					circular
					className="activate"
				>
					Activer
				</Button>
			</div>
		</>
	);
};

const QRcode = () => {
	const [phoneNumberValidated, setValidatePhoneNumber] = useState(false);

	return phoneNumberValidated ? (
		<PhoneValidated />
	) : (
		<PhoneNotValidated phoneValidatedEvent={setValidatePhoneNumber} />
	);
};

export default QRcode;
