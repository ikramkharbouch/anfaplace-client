import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import InputNumber from 'rc-input-number';

import { Link } from 'react-router-dom';

import Modal from 'src/Components/Modal';
import './VerificationModal.less';

const CustomInputNumber = ({ name, width, min, max, defaultValue, formatter }) => (
	<Form.Field
		name={name}
		width={width}
		inline
		min={min}
		max={max}
		defaultValue={defaultValue}
		formatter={formatter}
		control={InputNumber}
	/>
);

CustomInputNumber.propTypes = {
	name: PropTypes.string.isRequired,
	width: PropTypes.number,
	min: PropTypes.number,
	max: PropTypes.number,
	defaultValue: PropTypes.number,
	formatter: PropTypes.func,
	// value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	// onChange: PropTypes.func.isRequired,
};
CustomInputNumber.defaultProps = {
	width: null,
	min: -Number.MAX_SAFE_INTEGER,
	max: Number.MAX_SAFE_INTEGER,
	defaultValue: null,
	formatter: (value) => value,
	// value: null,
};

const ConfirmationTel = ({ confirm }) => (
	<>
		<p>Valider votre numéro de téléphone et commencer à collecter des points Anfapoints</p>

		<Form onSubmit={confirm} className="verification-form">
			<Form.Group width={16} unstackable>
				<CustomInputNumber
					name="country-code"
					autoFocus
					width={4}
					min={1}
					max={999}
					defaultValue={212}
					formatter={(value) => `+${value.substr(0, 3)}`}
					onChange={() => {
						document.getElementById('dig-2').focus();
					}}
				/>

				<Form.Field width={12} type="number" inline>
					<CustomInputNumber
						name="phone"
						id="dig-2"
						width={16}
						formatter={(value) => `${value.substr(0, 10)}`}
					/>
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
const PinVerification = () => {
	const formatter = (value) => `${value.toString().substr(0, 1)}`;
	return (
		<>
			<p>Vérification de votre numéro de téléphone</p>
			<Form className="pin-verification">
				<Form.Group className="digits" unstackable widths={16}>
					<Form.Field width={4}>
						<CustomInputNumber formatter={formatter} />
					</Form.Field>
					<Form.Field width={4}>
						<CustomInputNumber formatter={formatter} />
					</Form.Field>
					<Form.Field width={4}>
						<CustomInputNumber formatter={formatter} />
					</Form.Field>
					<Form.Field width={4}>
						<CustomInputNumber formatter={formatter} />
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
};

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
