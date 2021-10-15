/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Button, Form, Message, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { setNotification } from 'src/store/app/index';
import { useDispatch } from 'react-redux';
import firebaseApp from 'src/utils/initApp';
import { updateUser } from 'src/store/user/index';

const LoginForm = ({ onSuccess, onFailed }) => {
	const [values, setValues] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);
	const dispatch = useDispatch();

	const handleChange = (event) => {
		// console.log(event  )
		setValues((prev) => ({
			...prev,
			[event?.target?.name]: event?.target?.value,
		}));
	};

	const handleSubmit = async () => {
		try {
			setLoading(true);
			const hasFilledAllFields = !!values?.email && !!values?.password;
			const isPasswordValid = values?.password?.length > 5;

			if (!hasFilledAllFields) {
				setLoading(false);
				setError('*tous les champs sont requis');
				return;
			}

			if (!isPasswordValid) {
				setLoading(false);
				setError('Mot de passe trop court');
				return;
			}

			await firebase.auth().signInWithEmailAndPassword(values?.email, values?.password);

			setLoading(false);
			if (onSuccess) onSuccess();
		} catch (err) {
			console.log(err);
			setError(err?.message);
			if (onFailed) onFailed();
			setSuccess(false);
			setLoading(false);
			dispatch(
				setNotification({
					show: true,
					type: 'error',
					message: err?.message,
				})
			);
			onFailed();
			setLoading(false);
		}
	};

	const loginWithSocial = async (singInMethod) => {
		if (!singInMethod && typeof singInMethod !== 'string') return;

		try {
			setLoading(true);

			if (singInMethod === 'google') {
				const googleProvider = new firebase.auth.GoogleAuthProvider();
				const userCredential = await firebase.auth().signInWithPopup(googleProvider);
				const isNewUser =
					userCredential?.user?.metadata.creationTime === userCredential?.user?.metadata.lastSignInTime;
				if (isNewUser) {
					const finalUser = {
						uid: userCredential?.user?.uid,
						fullname: userCredential?.user?.displayName,
						accessToken: userCredential?.credential?.accessToken,
						idToken: userCredential?.credential?.idToken,
						signInMethod: userCredential?.credential?.signInMethod,
						name: userCredential?.additionalUserInfo?.profile?.family_name,
						firstname: userCredential?.additionalUserInfo?.profile?.given_name,
						photoUrl: userCredential?.additionalUserInfo?.profile?.picture,
						googleId: userCredential?.additionalUserInfo?.profile?.id,
						points: 50,
						email: userCredential?.user?.email,
					};

					const db = firebaseApp.firestore();
					const userRef = db.collection('users').doc(finalUser?.uid);
					const userInfos = await userRef.get();
					if (!userInfos.exists) {
						await userRef.set({
							...finalUser,
						});
					} else {
						await userRef.update({
							...finalUser,
						});
					}

					dispatch(
						updateUser({
							...finalUser,
						})
					);
				}
			}

			if (singInMethod === 'facebook') {
				const facebookProvider = new firebase.auth.FacebookAuthProvider();
				const userCredential = await firebase.auth().signInWithPopup(facebookProvider);

				const isNewUser =
					userCredential?.user?.metadata.creationTime === userCredential?.user?.metadata.lastSignInTime;
				// console.log('userCredential' , userCredential)
				if (isNewUser) {
					const finalUser = {
						uid: userCredential?.user?.uid,
						fullname: userCredential?.user?.displayName,
						accessToken: userCredential?.credential?.accessToken,
						signInMethod: userCredential?.credential?.signInMethod,
						name: userCredential?.additionalUserInfo?.profile?.last_name,
						firstname: userCredential?.additionalUserInfo?.profile?.first_name,
						photoUrl: userCredential?.additionalUserInfo?.profile?.picture?.data?.url,
						facebookId: userCredential?.additionalUserInfo.profile.id,
						points: 50,
						email: userCredential?.user?.email || '',
					};

					const db = firebaseApp.firestore();
					const userRef = db.collection('users').doc(finalUser?.uid);
					const userInfos = await userRef.get();
					if (!userInfos.exists) {
						await userRef.set({
							...finalUser,
						});
					} else {
						await userRef.update({
							...finalUser,
						});
					}

					dispatch(
						updateUser({
							...finalUser,
						})
					);
				}
			}

			setLoading(false);
			if (onSuccess) onSuccess();
		} catch (err) {
			console.log(err);
			setError(err?.message);
			if (onFailed) onFailed();
			setSuccess(false);
			setLoading(false);
			dispatch(
				setNotification({
					show: true,
					type: 'error',
					message: err?.message,
				})
			);
			onFailed();
			setLoading(false);
		}
	};

	return (
		<>
			<Form
				success={success}
				error={error?.length > 0}
				onSubmit={handleSubmit}
				className="contact-form"
			>
				<Form.Field>
					<input
						value={values?.email || ''}
						onChange={handleChange}
						name="email"
						type="email"
						placeholder="Email"
						required
					/>
				</Form.Field>
				<Form.Field>
					<input
						value={values?.password || ''}
						onChange={handleChange}
						name="password"
						type="password"
						placeholder="password"
						required
					/>
				</Form.Field>

				<Message error header="Erreur survenue" content={error} />

				<Message success header="Message envoyé avec succès" />
				<Button loading={loading} type="submit">
					Se connecter
				</Button>
			</Form>
			<Divider horizontal>Ou</Divider>

			<div style={{ marginBottom: 20 }}>
				<Button
					onClick={() => {
						loginWithSocial('facebook');
					}}
					circular
					color="facebook"
					icon="facebook"
				/>

				<Button
					onClick={() => {
						loginWithSocial('google');
					}}
					circular
					color="google plus"
					icon="google plus"
				/>
			</div>
		</>
	);
};

LoginForm.defaultProps = {
	onSuccess: () => {},
	onFailed: () => {},
};

LoginForm.propTypes = {
	onSuccess: PropTypes.func,
	onFailed: PropTypes.func,
};

export default LoginForm;
