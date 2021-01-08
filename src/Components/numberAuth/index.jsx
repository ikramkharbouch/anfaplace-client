import React, { useState } from 'react';
import { createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import { FormattedInput } from '@buttercup/react-formatted-input';
import firebase from 'firebase/app';
import { Link } from 'react-router-dom';
import { openPhoneAuth, setNotification } from 'src/store/app';
import Modal from 'src/Components/Modal';
import './VerificationModal.less';

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

const AuthTel = ({ confirm, verifying }) => {
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
				{/*
				<Form.Checkbox checked label="Opt-in whatsapp +200 points" />
*/}
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
AuthTel.propTypes = {
	confirm: PropTypes.func.isRequired,
	verifying: PropTypes.bool.isRequired,
};
const PinVerification = ({ loading, verifyPin }) => {
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
					<Button loading={loading} circular type="submit" className="continue">
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
	loading: PropTypes.bool.isRequired,
};

// eslint-disable-next-line no-unused-vars

const phoneAuthOpenModalSelector = createSelector(
	(state) => state.app.phoneAuth.open,
	(state) => state.interests.open,
	(state) => state.user.currentUser,
	(openPhoneAuthModal, openInterests, user) => {
		if (openInterests) {
			return false;
		}
		if (!user && openPhoneAuthModal) {
			return true;
		}
		return false;
	}
);

const PhoneAuthModal = ({ validatedEvent }) => {
	const [verifyPin, setVerifyPin] = useState(false);
	const [verifyLoading, setVerifyLoading] = useState();
	const [recaptchaVerifier, setRecaptchaVerifier] = useState();
	const [confirmation, setConfirmation] = useState();
	const [loadingPinConf, setLoadingPinConf] = useState(false);

	const open = useSelector(phoneAuthOpenModalSelector);
	const dispatch = useDispatch();
	const setOpen = (value) => dispatch(openPhoneAuth(value));

	const handleModalMount = () => {
		setRecaptchaVerifier(
			new firebase.auth.RecaptchaVerifier('verify-number', {
				size: 'invisible',
			})
		);
	};

	const handleNumberConfirmation = (Number) => {
		setVerifyLoading(true);
		firebase
			.auth()
			.signInWithPhoneNumber(Number, recaptchaVerifier)
			.then((confirmationResult) => {
				setConfirmation(confirmationResult);
				setVerifyPin(true);
			})
			.catch((error) => {
				console.error(error);
			});
	};
	const verifyPinHandeler = (verificationCode) => {
		setLoadingPinConf(true);

		confirmation
			.confirm(verificationCode)
			.then((result) => {
				validatedEvent();
				setLoadingPinConf(false);
				if (result.additionalUserInfo.isNewUser) {
					dispatch(setNotification({ show: true, type: 'wonPoints' }));
				}
			})
			.catch((error) => {
				setLoadingPinConf(false);
				console.log(error);
				// User couldn't sign in (bad verification code?)
				// ...
				// handle errors
			});
	};

	return (
		<Modal className="pin" onMount={handleModalMount} open={open} setOpen={setOpen}>
			{!verifyPin && <AuthTel verifying={verifyLoading} confirm={handleNumberConfirmation} />}
			{verifyPin && <PinVerification loading={loadingPinConf} verifyPin={verifyPinHandeler} />}
		</Modal>
	);
};
PhoneAuthModal.propTypes = {
	validatedEvent: PropTypes.func.isRequired,
};

export default PhoneAuthModal;
