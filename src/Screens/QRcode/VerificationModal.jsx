import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import InputNumber from 'rc-input-number';

import { Link } from 'react-router-dom';

import Modal from 'src/Components/Modal';
import './VerificationModal.less';

const CustomInputNumber = ({
	id,
	prefixCls,
	width,
	min,
	max,
	defaultValue,
	autoFocus,
	formatter,
	onChange,
	onBackSpace,
	value,
}) => (
	<Form.Field
		id={id}
		autoComplete="off"
		type="number"
		prefixCls={prefixCls}
		width={width}
		autoFocus={autoFocus}
		onKeyDown={(event) => {
			const { keyCode, target } = event;
			if (keyCode === 109 || keyCode === 110 || keyCode === 107) {
				event.preventDefault();
			}
			if (keyCode === 8 && !target.value) {
				event.preventDefault();
				onBackSpace();
			}
		}}
		onChange={onChange}
		value={value}
		inline
		min={min}
		max={max}
		defaultValue={defaultValue}
		formatter={formatter}
		pattern="[0-9]*"
		inputMode="numeric"
		step={1}
		control={InputNumber}
	/>
);

CustomInputNumber.propTypes = {
	id: PropTypes.string,
	prefixCls: PropTypes.string,
	width: PropTypes.number,
	min: PropTypes.number,
	max: PropTypes.number,
	defaultValue: PropTypes.number,
	autoFocus: PropTypes.bool,
	onChange: PropTypes.func,
	onBackSpace: PropTypes.func,
	formatter: PropTypes.func,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
CustomInputNumber.defaultProps = {
	id: '',
	prefixCls: '',
	width: null,
	min: -Number.MAX_SAFE_INTEGER,
	max: Number.MAX_SAFE_INTEGER,
	defaultValue: null,
	autoFocus: false,
	formatter: (value) => value,
	onChange: (value) => value,
	onBackSpace: () => {},
	value: undefined,
};

const ConfirmationTel = ({ confirm }) => {
	const [phoneNumber, setPhoneNumber] = useState({ countryCode: undefined, number: undefined });

	return (
		<>
			<p>Valider votre numéro de téléphone et commencer à collecter des points Anfapoints</p>

			<Form onSubmit={confirm} className="verification-form">
				<Form.Group width={16} unstackable>
					<CustomInputNumber
						prefixCls="plus"
						name="country-code"
						autoFocus
						width={4}
						min={1}
						max={999}
						defaultValue={212}
						formatter={(value) => value.substr(0, 3)}
						value={phoneNumber.countryCode}
						onChange={(value) => {
							setPhoneNumber({ ...phoneNumber, countryCode: value });
						}}
					/>

					<Form.Field width={12} type="number" inline>
						<CustomInputNumber
							width={16}
							autoFocus
							formatter={(value) => value.substr(0, 10)}
							value={phoneNumber.number}
							onChange={(value) => {
								setPhoneNumber({ ...phoneNumber, number: value });
							}}
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
};
ConfirmationTel.propTypes = {
	confirm: PropTypes.func.isRequired,
};
const PinVerification = ({ verifiedEvent }) => {
	const formatter = (value) => (value ? `${value.toString().substr(0, 1)}` : null);
	const [pin, setPin] = useState({
		'digit-1': null,
		'digit-2': null,
		'digit-3': null,
		'digit-4': null,
	});
	const handleOnChange = (value, pinDigit) => {
		console.log(value);
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

	return (
		<>
			<p>Vérification de votre numéro de téléphone</p>
			<Form className="pin-verification">
				<Form.Group className="digits" unstackable widths={16}>
					<CustomInputNumber
						id="digit-1"
						onChange={(value) => {
							handleOnChange(value, 1);
						}}
						width={4}
						formatter={formatter}
						autoFocus
						value={pin['digit-1']}
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
						formatter={formatter}
						value={pin['digit-2']}
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
						formatter={formatter}
						value={pin['digit-3']}
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
						formatter={formatter}
						value={pin['digit-4']}
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
