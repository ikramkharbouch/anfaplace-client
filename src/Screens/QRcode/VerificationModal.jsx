import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import { FormattedInput } from '@buttercup/react-formatted-input';

import { Link } from 'react-router-dom';

import Modal from 'src/Components/Modal';
import './VerificationModal.less';

const CustomInputNumber = ({
	id,

	width,
	autoFocus,
	onChange,
	onBackSpace,
	value,
	format,
}) => (
	<Form.Field
		id={id}
		autoComplete="off"
		type="tel"
		width={width}
		format={format}
		autoFocus={autoFocus}
		onKeyDown={(event) => {
			const { keyCode, target } = event;
			if (keyCode === 8 && !target.value) {
				console.log('key down pin===>', keyCode);
				event.preventDefault();
				onBackSpace();
			}
		}}
		onChange={(formattedValue, raw) => {
			onChange(raw);
		}}
		value={value}
		inline
		decimalSeparator={null}
		allowNegative={false}
		thousandSeparator={false}
		control={FormattedInput}
	/>
);

CustomInputNumber.propTypes = {
	id: PropTypes.string,
	width: PropTypes.number,
	autoFocus: PropTypes.bool,
	onChange: PropTypes.func,
	onBackSpace: PropTypes.func,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	format: PropTypes.string,
};
CustomInputNumber.defaultProps = {
	id: '',
	width: null,
	autoFocus: false,
	format: '',
	onChange: (value) => value,
	onBackSpace: () => {},
	value: undefined,
};

const ConfirmationTel = ({ confirm }) => {
	const [phoneNumber, setPhoneNumber] = useState({ countryCode: '212', number: undefined });
	const formatCountryCode = [{ exactly: '+' }, { char: /\d/, repeat: 3 }];
	const formatNumber = [{ char: /\d/, repeat: 9 }];
	return (
		<>
			<p>Valider votre numéro de téléphone et commencer à collecter des points Anfapoints</p>

			<Form onSubmit={confirm} className="verification-form">
				<Form.Group widths={16} inline unstackable>
					<CustomInputNumber
						name="country-code"
						autoFocus
						width={5}
						format={formatCountryCode}
						value={phoneNumber.countryCode}
						onChange={(value) => {
							setPhoneNumber({ ...phoneNumber, countryCode: value });
						}}
					/>

					<CustomInputNumber
						width={11}
						autoFocus
						format={formatNumber}
						value={phoneNumber.number}
						onChange={(value) => {
							setPhoneNumber({ ...phoneNumber, number: value });
						}}
					/>
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
};
ConfirmationTel.propTypes = {
	confirm: PropTypes.func.isRequired,
};
const PinVerification = ({ verifiedEvent }) => {
	const [pin, setPin] = useState({
		'digit-1': undefined,
		'digit-2': undefined,
		'digit-3': undefined,
		'digit-4': undefined,
	});
	const handleOnChange = (value, pinDigit) => {
		setPin({ ...pin, [`digit-${pinDigit}`]: value });
		if (value && pinDigit !== 4) {
			document.getElementById(`digit-${pinDigit}`).blur();

			document.getElementById(`digit-${pinDigit + 1}`).focus();
		}
	};

	const handleBackSpace = (pinDigit) => {
		if (!pin[`digit-${pinDigit}`]) {
			document.getElementById(`digit-${pinDigit}`).blur();

			document.getElementById(`digit-${pinDigit - 1}`).focus();
		}
	};
	const format = [{ char: /\d/, repeat: 1 }];

	return (
		<>
			<p>Vérification de votre numéro de téléphone</p>
			<Form className="pin-verification">
				<Form.Group className="digits" unstackable inline widths={16}>
					<CustomInputNumber
						id="digit-1"
						onChange={(value) => {
							handleOnChange(value, 1);
						}}
						width={4}
						autoFocus
						value={pin['digit-1']}
						format={format}
					/>
					<CustomInputNumber
						id="digit-2"
						width={4}
						onChange={(value) => {
							handleOnChange(value, 2);
						}}
						onBackSpace={() => {
							handleBackSpace(2);
						}}
						value={pin['digit-2']}
						format={format}
					/>
					<CustomInputNumber
						id="digit-3"
						width={4}
						onBackSpace={() => {
							handleBackSpace(3);
						}}
						onChange={(value) => {
							handleOnChange(value, 3);
						}}
						value={pin['digit-3']}
						format={format}
					/>
					<CustomInputNumber
						id="digit-4"
						width={4}
						onChange={(value) => {
							handleOnChange(value, 4);
						}}
						onBackSpace={() => {
							handleBackSpace(4);
						}}
						value={pin['digit-4']}
						format={format}
					/>
				</Form.Group>

				<Form.Field>
					<Button circular onClick={() => verifiedEvent(true)} className="continue">
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

PinVerification.propTypes = {
	verifiedEvent: PropTypes.func.isRequired,
};

const VerificationModal = ({ open, setOpen, validatedEvent }) => {
	const [verifyPin, setVerifyPin] = useState(false);

	return (
		<Modal className="pin" open={open} setOpen={setOpen}>
			{!verifyPin && <ConfirmationTel confirm={() => setVerifyPin(true)} />}
			{verifyPin && <PinVerification verifiedEvent={validatedEvent} />}
		</Modal>
	);
};
VerificationModal.propTypes = {
	open: PropTypes.func.isRequired,
	setOpen: PropTypes.func.isRequired,
	validatedEvent: PropTypes.func.isRequired,
};

export default VerificationModal;
