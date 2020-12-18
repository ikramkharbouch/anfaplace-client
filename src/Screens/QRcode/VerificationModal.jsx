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
	value,
}) => (
	<Form.Field
		id={id}
		autoComplete="off"
		type="number"
		prefixCls={prefixCls}
		width={width}
		autoFocus={autoFocus}
		onChange={onChange}
		value={value}
		inline
		min={min}
		max={max}
		defaultValue={defaultValue}
		formatter={formatter}
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
	formatter: PropTypes.func,
	value: PropTypes.number,
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
						onChange={(value) => setPhoneNumber({ ...phoneNumber, countryCode: value })}
					/>

					<Form.Field width={12} type="number" inline>
						<CustomInputNumber
							width={16}
							autoFocus
							formatter={(value) => value.substr(0, 10)}
							value={phoneNumber.number}
							onChange={(value) => setPhoneNumber({ ...phoneNumber, number: value })}
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
	const formatter = (value) => `${value.toString().substr(0, 1)}`;
	const [pin, setPin] = useState({
		'digit-1': null,
		'digit-2': null,
		'digit-3': null,
		'digit-4': null,
	});
	return (
		<>
			<p>Vérification de votre numéro de téléphone</p>
			<Form className="pin-verification">
				<Form.Group className="digits" unstackable widths={16}>
					<CustomInputNumber
						onChange={(value) => {
							document.getElementById('digit-2').focus();
							setPin({ ...pin, 'digit-1': value });
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
							setPin({ ...pin, 'digit-2': value });
							document.getElementById('digit-3').focus();
						}}
						formatter={formatter}
						value={pin['digit-2']}
					/>
					<CustomInputNumber
						id="digit-3"
						width={4}
						onChange={(value) => {
							setPin({ ...pin, 'digit-3': value });
							document.getElementById('digit-4').focus();
						}}
						formatter={formatter}
						value={pin['digit-3']}
					/>
					<CustomInputNumber
						id="digit-4"
						width={4}
						onChange={(value) => setPin({ ...pin, 'digit-4': value })}
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
		<Modal open={open} setOpen={setOpen}>
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
