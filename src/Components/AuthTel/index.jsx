import React, { useState } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import Modal from 'src/Components/Modal';
import { FormattedInput } from '@buttercup/react-formatted-input';
import { Button, Form } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from 'src/store/user/index';
import firebaseApp from 'src/utils/initApp';
import { openAuthTelModal } from 'src/store/shared/index';
import { setNotification } from 'src/store/app/index';

const CustomInputNumber = ({
	id,
	width,
	autoFocus,
	placeholder,
	onChange,
	onBackSpace,
	value,
	required,
	format,
}) => (
	<Form.Field
		id={id}
		autoComplete="off"
		type="tel"
		width={width}
		placeholder={placeholder}
		className="custom-number"
		format={format}
		required={required}
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

CustomInputNumber.defaultProps = {
	id: '',
	width: null,
	autoFocus: false,
	placeholder: '',
	format: null,
	required: true,
	onChange: (value) => value,
	onBackSpace: () => {},
	value: undefined,
};

CustomInputNumber.propTypes = {
	id: PropTypes.string,
	width: PropTypes.number,
	autoFocus: PropTypes.bool,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	required: PropTypes.bool,
	onBackSpace: PropTypes.func,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	format: PropTypes.arrayOf(PropTypes.shape({})),
};

const PhoneAuth = ({ confirm, verifying, validateBySmsEvent, validateBySmsValue }) => {
	const [phoneNumber, setPhoneNumber] = useState({ countryCode: '212', number: undefined });
	const formatCountryCode = [{ exactly: '+' }, { char: /\d/, repeat: 3 }];
	const formatNumber = [{ char: /\d/, repeat: 9 }];
	return (
		<>
			<p className="activate">
				Valider votre numéro de téléphone et profitez de nombreux avantages My Anfaplace{' '}
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
				<a href="//myanfaplace.com/tc.pdf" className="tos">
					Politique de confidentialité
				</a>
				{/*
				<Form.Checkbox checked label="Opt-in whatsapp +200 points" />
*/}
				<Form.Checkbox
					onChange={validateBySmsEvent}
					checked={validateBySmsValue}
					label="Validation par SMS +50 points"
				/>
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

PhoneAuth.propTypes = {
	confirm: PropTypes.func.isRequired,
	verifying: PropTypes.bool.isRequired,
	validateBySmsEvent: PropTypes.func.isRequired,
	validateBySmsValue: PropTypes.bool.isRequired,
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
				{/* <span className="retry"> */}
				{/*	Je n’ai pas reçu de code.<Link to="/"> Renvoyer le code</Link> */}
				{/* </span> */}
			</Form>
		</>
	);
};

PinVerification.propTypes = {
	verifyPin: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
};

const AuthTel = () => {
	const [validationModalOpen, setValidationModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [verificationId, setVerificationId] = useState(null);
	const [isVerifying, setIsVerifying] = useState(false);

	const dispatch = useDispatch();
	const {
		auth: { authTelModalOpen },
	} = useSelector((state) => state.shared);

	const confirmSubscription = async (phone) => {
		setLoading(true);
		const appVerifier = window.recaptchaVerifier;
		const phoneProvider = new firebase.auth.PhoneAuthProvider();
		const verifId = await phoneProvider.verifyPhoneNumber(phone, appVerifier);
		setVerificationId(verifId);
		setValidationModalOpen(true);
		setLoading(false);
	};

	const handleVerifyPin = async (pin) => {
		try {
			setIsVerifying(true);
			const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, pin);
			const { currentUser } = firebase.auth();
			const { user: finalUser } = await currentUser.linkWithCredential(credential);
			const db = firebaseApp.firestore();
			const userRef = db.collection('users').doc(finalUser?.uid);
			const userInfos = await userRef.get();

			if (!userInfos.exists) {
				await userRef.set({
					phoneNumber: finalUser?.phoneNumber,
					points: 50,
					// phone: finalUser?.phoneNumber,
				});
				dispatch(
					updateUser({
						phoneNumber: finalUser?.phoneNumber,
						points: 50,
					})
				);
			} else {
				const userData = userInfos.data();
				const userPoints = userData?.points || 0;

				const finalTotal = parseInt(userPoints, 10) + 50;

				await userRef.update({
					phoneNumber: finalUser?.phoneNumber,
					points: finalTotal,
				});

				dispatch(
					updateUser({
						phoneNumber: finalUser?.phoneNumber,
						points: finalTotal,
					})
				);
			}

			setIsVerifying(false);
			setValidationModalOpen(false);
			dispatch(openAuthTelModal(false));
			dispatch(
				setNotification({ show: true, type: 'success', message: 'Vous avez gagné +50 points' })
			);
		} catch (err) {
			console.log(err);
			setIsVerifying(false);
			dispatch(setNotification({ show: true, type: 'error', message: err?.message }));
		}
	};

	return (
		<>
			<Modal open={authTelModalOpen} setOpen={(isOpen) => dispatch(openAuthTelModal(isOpen))}>
				<PhoneAuth verifying={loading} validateBySmsValue confirm={confirmSubscription} />
			</Modal>
			<Modal open={validationModalOpen} setOpen={(isOpen) => setValidationModalOpen(isOpen)}>
				<PinVerification loading={isVerifying} verifyPin={handleVerifyPin} />
			</Modal>
		</>
	);
};

export default AuthTel;
