/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './style.less';
import { Button, Form, Message } from 'semantic-ui-react';
import firebaseApp from 'src/utils/initApp';
import PropTypes from 'prop-types';

const contactsCollection = firebaseApp.firestore().collection('contacts');

const ContactForm = ({ onSuccess, onFailed }) => {
	const [values, setValues] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	const handleChange = (event) => {
		// console.log(event  )
		setValues((prev) => ({
			...prev,
			[event?.target?.name]: event?.target?.value,
		}));
	};

	const handleSubmit = async () => {
		setLoading(true);
		try {
			const user = firebaseApp.auth().currentUser;
			const contactRef = contactsCollection.doc(user.uid);
			const form = contactRef.collection('form').doc();
			await form.set({ ...values });
			if (onSuccess) onSuccess();
			setSuccess(true);
			setValues({});
			setLoading(false);
		} catch (err) {
			console.log(err);
			setError(err?.message);
			if (onFailed) onFailed();
			setSuccess(false);
			setLoading(false);
		}
	};

	return (
		<Form
			success={success}
			error={error?.length > 0}
			onSubmit={handleSubmit}
			className="contact-form"
		>
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
					value={values?.lastname || ''}
					onChange={handleChange}
					name="lastname"
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
					value={values?.object || ''}
					onChange={handleChange}
					name="object"
					type="text"
					placeholder="Objet"
				/>
			</Form.Field>
			<Form.Field>
				<textarea
					value={values?.message || ''}
					onChange={handleChange}
					name="message"
					placeholder="Message"
					required
				/>
			</Form.Field>
			<Message error header="Erreur survenue" content={error} />

			<Message success header="Message envoyé avec succès" />
			<Button loading={loading} type="submit">
				Envoyer
			</Button>
		</Form>
	);
};

ContactForm.defaultProps = {
	onSuccess: () => {},
	onFailed: () => {},
};

ContactForm.propTypes = {
	onSuccess: PropTypes.func,
	onFailed: PropTypes.func,
};

export default ContactForm;
