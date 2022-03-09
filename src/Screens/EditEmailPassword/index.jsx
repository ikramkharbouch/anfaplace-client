/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Form, Button, Header, Divider } from 'semantic-ui-react';
import './style.less';

const EditEmailPassword = () => {
	const [values, setValues] = useState({});

	const handleChange = (event) => {
		// console.log(event  )
		setValues((prev) => ({
			...prev,
			[event?.target?.name]: event?.target?.value,
		}));
	};

	return (
		<div className="page-content account-page">
			<Header as="h2" className="page-title" size="large">
				Modifier{' '}
			</Header>
			<Divider />
			<Form>
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

				<Button fluid size="large" type="submit">
					Mettre à jour
				</Button>
			</Form>
		</div>
	);
};

export default EditEmailPassword;
