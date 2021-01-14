import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import { FormattedInput } from '@buttercup/react-formatted-input';
import firebase from 'firebase/app';
import { Link } from 'react-router-dom';
import { AuthContext } from 'src/utils/AuthContext';
import Modal from 'src/Components/Modal';
import './VerificationModal.less';
import { openNumberVerificationModal } from 'src/store/app';

const CustomInputNumber = ({ id, width, autoFocus, onChange, onBackSpace, value, format }) => (
	<Form.Field
		id={id}
		autoComplete="off"
		type="tel"
		width={width}
		format={format}
		required
		autoFocus={autoFocus}
		onKeyDown={(event) => {
			const { keyCode, target } = event;
			if (keyCode === 8 && !target.value) {
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

const ConfirmationTel = ({ confirm, verifying }) => {
	const [phoneNumber, setPhoneNumber] = useState({ countryCode: '212', number: undefined });
	const formatCountryCode = [{ exactly: '+' }, { char: /\d/, repeat: 3 }];
	const formatNumber = [{ char: /\d/, repeat: 9 }];
	return (
		<>
			<p className="activate">
				Valider votre numéro de téléphone et commencer à collecter des points Anfapoints
			</p>

			<Form
				onSubmit={() => {
					confirm(`+${phoneNumber.countryCode}${phoneNumber.number}`);
				}}
				className="verification-form"
			>
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
				<Form.Checkbox checked label="Opt-in whatsapp +200 points" />
				<Form.Checkbox checked label="Validation par SMS +100 points" />
				<Form.Button
					type="submit"
					loading={verifying}
					id="verify-number"
					className="confirmer"
					circular
				>
					Confirmer mon numéro
				</Form.Button>
			</Form>
		</>
	);
};
ConfirmationTel.propTypes = {
	confirm: PropTypes.func.isRequired,
	verifying: PropTypes.bool.isRequired,
};
const PinVerification = ({ verifyPin }) => {
	const [pin, setPin] = useState({
		'digit-1': undefined,
		'digit-2': undefined,
		'digit-3': undefined,
		'digit-4': undefined,
		'digit-5': undefined,
		'digit-6': undefined,
	});
	const handleOnChange = (value, pinDigit) => {
		setPin({ ...pin, [`digit-${pinDigit}`]: value });
		if (value && pinDigit !== 6) {
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
			<Form
				onSubmit={() =>
					verifyPin(
						pin['digit-1'] +
							pin['digit-2'] +
							pin['digit-3'] +
							pin['digit-4'] +
							pin['digit-5'] +
							pin['digit-6']
					)
				}
				className="pin-verification"
			>
				<Form.Group className="digits" unstackable inline widths={16}>
					<CustomInputNumber
						id="digit-1"
						onChange={(value) => {
							handleOnChange(value, 1);
						}}
						width={2}
						autoFocus
						value={pin['digit-1']}
						format={format}
					/>
					<CustomInputNumber
						id="digit-2"
						width={2}
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
						width={2}
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
						width={2}
						onChange={(value) => {
							handleOnChange(value, 4);
						}}
						onBackSpace={() => {
							handleBackSpace(4);
						}}
						value={pin['digit-4']}
						format={format}
					/>
					<CustomInputNumber
						id="digit-5"
						width={2}
						onChange={(value) => {
							handleOnChange(value, 5);
						}}
						onBackSpace={() => {
							handleBackSpace(5);
						}}
						value={pin['digit-5']}
						format={format}
					/>
					<CustomInputNumber
						id="digit-6"
						width={2}
						onChange={(value) => {
							handleOnChange(value, 6);
						}}
						onBackSpace={() => {
							handleBackSpace(6);
						}}
						value={pin['digit-6']}
						format={format}
					/>
				</Form.Group>

				<Form.Field>
					<Button circular type="submit" className="continue">
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
	verifyPin: PropTypes.func.isRequired,
};

// eslint-disable-next-line no-unused-vars

const VerificationModal = ({ validatedEvent }) => {
	const [verifyPin, setVerifyPin] = useState(false);
	const { user } = useContext(AuthContext);
	const [verifyLoading, setVerifyLoading] = useState();
	const [recaptchaVerifier, setRecaptchaVerifier] = useState();
	const [verificationId, setVerificationId] = useState();
	const verifyPinHandeler = (verificationCode) => {
		// Ask user for the verification code.
		const cred = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
		const multiFactorAssertion = firebase.auth.PhoneMultiFactorGenerator.assertion(cred);
		// Complete enrollment.
		user.multiFactor.enroll(multiFactorAssertion, 'SMS-VERIFICATION').then(() => {
			validatedEvent();
		});
	};
	const open = useSelector((state) => state.app.numberVerificationModal.open);
	const dispatch = useDispatch();
	const setOpen = (value) => dispatch(openNumberVerificationModal(value));
	const handleNumberConfirmation = (Number) => {
		setVerifyLoading(true);
		user.multiFactor.getSession().then((multiFactorSession) => {
			// Specify the phone number and pass the MFA session.
			const phoneInfoOptions = {
				phoneNumber: Number,
				session: multiFactorSession,
			};
			const phoneAuthProvider = new firebase.auth.PhoneAuthProvider();
			// Send SMS verification code.
			phoneAuthProvider
				.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)
				.then((result) => {
					setVerificationId(result);
					setVerifyPin(true);
				})
				.catch((error) => {
					console.error(error);
				});
		});
	};

	const handleModalMount = () => {
		setRecaptchaVerifier(
			new firebase.auth.RecaptchaVerifier('verify-number', {
				size: 'invisible',
			})
		);
	};
	return (
		<Modal className="pin" onMount={handleModalMount} open={open} setOpen={setOpen}>
			{!verifyPin && <ConfirmationTel verifying={verifyLoading} confirm={handleNumberConfirmation} />}
			{verifyPin && <PinVerification verifyPin={verifyPinHandeler} />}
		</Modal>
	);
};
VerificationModal.propTypes = {
	validatedEvent: PropTypes.func.isRequired,
};

export default VerificationModal;
