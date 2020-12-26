import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Icon } from 'semantic-ui-react';
import BackButton from 'src/Components/BackButton/BackButton';
import './QRcode.less';
import VerificationModal from './VerificationModal';

const PhoneValidated = () => (
	<div className="qrcode-section">
		<div className="qrcode-section-header">
			<BackButton text="QR code" />
		</div>
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

const PhoneNotValidated = ({ phoneValidatedEvent }) => {
	const [validationModelIsOpen, openValidationModal] = useState(false);

	return (
		<>
			<VerificationModal
				setOpen={(isOpen) => openValidationModal(isOpen)}
				open={validationModelIsOpen}
				validatedEvent={phoneValidatedEvent}
			/>
			<div className="qrcode-screen">
				<div className="content">
					<Header as="h2">Votre QR Code n’est pas actif</Header>
					<p>Activer votre QR CODE et profiter des remises instantanées en magasin</p>
					<Icon className="big" name="qrcode" />
				</div>

				<Button
					circular
					className="activate"
					onClick={() => {
						openValidationModal(true);
					}}
				>
					Activer
				</Button>
			</div>
		</>
	);
};
PhoneNotValidated.propTypes = {
	phoneValidatedEvent: PropTypes.func.isRequired,
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
