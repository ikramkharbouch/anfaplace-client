import React, { useState } from 'react';
import { Button, Header, Icon } from 'semantic-ui-react';
import './QRcode.less';
import VerificationModal from './VerificationModal';

const QRcode = () => {
	const [validationModelIsOpen, openValidationModal] = useState(false);

	return (
		<div className="qrcode-screen">
			<VerificationModal
				setOpen={(isOpen) => openValidationModal(isOpen)}
				open={validationModelIsOpen}
			/>
			<Header as="h2">Votre QR Code n’est pas actif</Header>
			<p>Activer votre QR CODE et profiter des remises instantanées en magasin</p>
			<Icon name="qrcode" />
			<Button circular className="activate" onClick={() => openValidationModal(true)}>
				Activer
			</Button>
		</div>
	);
};

export default QRcode;
