/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { Form, Button, Header, Divider } from 'semantic-ui-react';
import { setNotification } from 'src/store/app/index';
import { openAuthModal } from 'src/store/shared/index';
import firebaseApp from 'src/utils/initApp';
import './style.less';

const Profile = () => {
	const [values, setValues] = useState({});
	const [loading, setLoading] = useState(false);

	// const [hasPasswordProviderId, setHasPasswordProviderId] = useState(false);
	// const [hasPhoneProviderId, setHasPhoneProviderId] = useState(false);

	const userInfos = useSelector((state) => state.user.currentUser);
	// const hasPhoneProviderId = userInfos?.providerId?.includes('phone')
	// const hasPasswordProviderId = userInfos?.providerId?.includes('password')

	// const history = useHistory();
	const dispatch = useDispatch();
    const {  currentUser }  = useSelector( state => state.user )

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
			const hasFilledAtLeastOne = !!values?.name || !!values?.firstname;

			if (hasFilledAtLeastOne) {
				const user = firebaseApp.auth().currentUser;
				const db = firebaseApp.firestore();
				const userRef = db.collection('users').doc(user?.uid);
				const doc = await userRef.get();

				if (doc.exists) {
					await userRef.update({
						name: values?.name,
						firstname: values?.firstname,
					});

					dispatch(
						setNotification({
							type: 'success',
							show: true,
							message: 'Informations mises à jour avec succès :)',
						})
					);
				}
				setLoading(false);
			}
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (userInfos) {
			// console.log(userInfos?.providerId);
			setValues({
				name: userInfos?.name,
				firstname: userInfos?.firstname,
			});

			// setHasPasswordProviderId(userInfos?.providerId?.includes('password'));
			// setHasPhoneProviderId(userInfos?.providerId?.includes('phone'));
		}
	}, [userInfos]);



    if(!currentUser){
        return (
            <div className = 'page-content'>
                 <Header as = 'h2' className = 'page-title text-center' size='large'>Merci de vous connecter</Header>
                <Divider />
                <Button onClick = { () => dispatch(openAuthModal(true)) }  fluid circular className = 'mb-20' >
                    Se connecter
                </Button>
            </div>
        )
    }


	return (
		<div className="page-content account-page">
			<Header as="h2" className="page-title" size="large">
				Mon compte
			</Header>
			<Divider />
			<Form onSubmit={handleSubmit}>
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

				<Button loading={loading} fluid size="large" type="submit">
					Mettre à jour
				</Button>
			</Form>

			{/* {(hasPhoneProviderId || hasPasswordProviderId) && <Divider />}

			{hasPhoneProviderId && (
				<Button onClick={() => history.push('/edit/phone')} className="mb-20" fluid size="large">
					Modifier son numéro de téléphone
				</Button>
			)}

			{hasPasswordProviderId && (
				<Button onClick={() => history.push('/edit/email-password')} fluid size="large" type="submit">
					Modifier son email ou mot de passe
				</Button>
			)} */}
		</div>
	);
};

export default Profile;
