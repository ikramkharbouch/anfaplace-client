/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Button, Form, Message, Divider } from 'semantic-ui-react';
import firebase from 'firebase';
// import firebaseApp from 'src/utils/initApp';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// import { setNotification } from 'src/store/app/index';
import firebaseApp from 'src/utils/initApp';
import { updateUser } from 'src/store/user/index';
import { setNotification } from 'src/store/app/index';
// import { openAuthTelModal } from 'src/store/shared/index';

const RegisterForm = ({ onSuccess, onFailed }) => {
	const [values, setValues] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

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
			setError('');
			setLoading(true);

			const hasFilledAllFields =
				!!values?.name &&
				!!values?.firstname &&
				!!values?.email &&
				!!values?.password &&
				!!values?.confirmedPassword;

			const isPasswordValid = values?.password?.length > 5;

			const passwordsMatch = values?.password === values?.confirmedPassword;

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

			if (!passwordsMatch) {
				setLoading(false);
				setError('Mots de passe ne correspondent pas');
				return;
			}

			const finalUser = await firebase
				.auth()
				.createUserWithEmailAndPassword(values?.email, values?.password);
			const db = firebaseApp.firestore();
			const userRef = db.collection('users').doc(finalUser?.uid);
			const userInfos = await userRef.get();
			if (!userInfos.exists) {
				await userRef.set({
					name: values?.name,
					firstname: values?.firstname,
					email: values?.email,
					// phone: finalUser?.phoneNumber,
				});
			} else {
				await userRef.update({
					name: values?.name,
					firstname: values?.firstname,
					email: values?.email,
					// phone: finalUser?.phoneNumber,
				});
			}

			dispatch(
				updateUser({
					name: values?.name,
					firstname: values?.firstname,
					email: values?.email,
					phoneNumber: finalUser?.phoneNumber,
				})
			);

			// if (!finalUser?.phoneNumber) {
			// 	dispatch(openAuthTelModal(true));
			// }

			setLoading(false);
			onSuccess();
		} catch (err) {
			console.log(err);
			setLoading(false);
			setError(err?.message);
			onFailed();
			setLoading(false);
			dispatch(
				setNotification({
					show: true,
					type: 'error',
					message: err?.message,
				})
			);
		}
	};

	useEffect(() => {
		if (!window.recaptchaVerifier) {
			window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
				size: 'invisible',
				defaultCountry: 'MA',
			});
		}
	}, []);

	return (
		<>
			<Form error={error?.length > 0} onSubmit={handleSubmit} className="contact-form">
				<Form.Field>
					<input
						value={values?.name || ''}
						name="name"
						onChange={handleChange}
						type="text"
						placeholder="Nom"
						required
					/>
				</Form.Field>
				<Form.Field>
					<input
						value={values?.firstname || ''}
						onChange={handleChange}
						name="firstname"
						placeholder="Prénom"
						required
					/>
				</Form.Field>
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
						placeholder="Mot de passe"
						required
					/>
				</Form.Field>
				<Form.Field>
					<input
						value={values?.confirmedPassword || ''}
						onChange={handleChange}
						name="confirmedPassword"
						type="password"
						placeholder="Confirmer le mot de passe"
						required
					/>
				</Form.Field>

				<Message error header="Erreur survenue" content={error} />

				<Message success header="Message envoyé avec succès" />
				<Button loading={loading} type="submit">
					Je m'inscris
				</Button>
			</Form>
			<Divider horizontal>Ou</Divider>
		</>
	);
};

RegisterForm.defaultProps = {
	onSuccess: () => {},
	onFailed: () => {},
};

RegisterForm.propTypes = {
	onSuccess: PropTypes.func,
	onFailed: PropTypes.func,
};

export default RegisterForm;
