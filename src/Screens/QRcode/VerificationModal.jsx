import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Modal from 'src/Components/Modal';
import './VerificationModal.less';

const ConfirmationTel = ({ confirm }) => (
	<>
		<p>Valider votre numéro de téléphone et commencer à collecter des points Anfapoints</p>

		<Form onSubmit={confirm} className="verification-form">
			<Form.Group width={16} unstackable>
				<Form.Field width={4} inline>
					<Input placeholder="+212" />
				</Form.Field>

				<Form.Field width={12} inline>
					<Input type="tel" />
				</Form.Field>
			</Form.Group>
			<Link to="/" className="tos">
				Politique de confidentialité
			</Link>
			<Form.Checkbox label="Opt-in whatsapp +200 points" />
			<Form.Checkbox label="Validation par SMS +100 points" />
			<Form.Button className="confirmer" circular>
				Confirmer mon numéro
			</Form.Button>
		</Form>
	</>
);
ConfirmationTel.propTypes = {
	confirm: PropTypes.func.isRequired,
};
const PinVerification = () => (
	<>
		<p>Vérification de votre numéro de téléphone</p>
		<Form className="pin-verification">
			<Form.Group className="digits" unstackable widths={16}>
				<Form.Field width={4}>
					<Input maxLength={1} type="number" />
				</Form.Field>
				<Form.Field width={4}>
					<Input maxLength={1} type="number" />
				</Form.Field>
				<Form.Field width={4}>
					<Input maxLength={1} type="number" />
				</Form.Field>
				<Form.Field width={4}>
					<Input maxLength={1} type="number" />
				</Form.Field>
			</Form.Group>

			<Form.Field>
				<Button circular className="continue">
					Continuer
				</Button>
			</Form.Field>
			<span className="retry">
				Je n’ai pas reçu de code.<Link to="/"> Renvoyer le code</Link>
			</span>
		</Form>
	</>
);

const VerificationModal = ({ open, setOpen }) => {
	const [verifyPin, setVerifyPin] = useState(false);

	return (
		<Modal open={open} setOpen={setOpen}>
			{!verifyPin && <ConfirmationTel confirm={() => setVerifyPin(true)} />}
			{verifyPin && <PinVerification />}
		</Modal>
	);
};
VerificationModal.propTypes = {
	open: PropTypes.func.isRequired,
	setOpen: PropTypes.func.isRequired,
};

export default VerificationModal;
