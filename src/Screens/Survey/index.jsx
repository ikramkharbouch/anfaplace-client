import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { openPhoneAuth } from 'src/store/app';

import { Dimmer, Form, Header, Loader } from 'semantic-ui-react';
import Button from 'src/Components/Button';
import Modal from 'src/Components/Modal';
import { openCongratulation, setLoadingUserQuestionnaire } from 'src/store/survey';
import surveyActions from 'src/store/survey/actions';
import BackButton from 'src/Components/BackButton/BackButton';
import CheckField from './Components/CheckField';
import './Servey.less';

const Survey = () => {
	// eslint-disable-next-line no-unused-vars
	const history = useHistory();
	const { id } = useParams();
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const dispatch = useDispatch();
	// eslint-disable-next-line no-unused-vars
	const {
		loadingUserQuestionnaire,
		loadingList,
		userQuestionnaire: { questionnaires: questionnaire },
	} = useSelector((state) => state.questionnaires);
	const [answer, setAnswer] = useState();
	const open = useSelector((state) => state.questionnaires.openCongratulation);

	const user = useSelector((state) => state.user.currentUser);
	const currentQuestionnaire = useSelector((state) =>
		state.questionnaires.list.find((qs) => qs.index === id)
	);

	useEffect(() => {
		if (questionnaire && questionnaire.Questions) {
			let currentQ = 0;
			questionnaire.Questions.forEach((quetion) => {
				if (quetion.status === 'complet') {
					currentQ += 1;
				}
			});
			setCurrentQuestion(currentQ);
		}
	}, [questionnaire, user]);
	useEffect(() => {
		if (id && user && !loadingList && !currentQuestionnaire.complet) {
			dispatch(setLoadingUserQuestionnaire(true));
			dispatch({
				type: surveyActions.FETCH_USER_QUESTIONNAIRE,
				payload: { id, participe: currentQuestionnaire.participe },
			});
		}
	}, [id, user, loadingList]);

	const handleSubmit = () => {
		if (currentQuestion + 1 === questionnaire.Questions.length) {
			dispatch({
				type: surveyActions.ANSWER_QUESTION,
				payload: {
					idQuestionnaire: id,
					questionResponses: {
						question: questionnaire.Questions[currentQuestion].question,
						reponses: [{ reponse: answer.split('##')[0] }],
					},
					isLast: true,
					id,
				},
			});
		} else {
			dispatch({
				type: surveyActions.ANSWER_QUESTION,
				payload: {
					idQuestionnaire: id,
					questionResponses: {
						question: questionnaire.Questions[currentQuestion].question,
						reponses: [{ reponse: answer.split('##')[0] }],
					},
				},
			});
			setCurrentQuestion(currentQuestion + 1);
		}
	};

	// eslint-disable-next-line no-nested-ternary
	return !user ? (
		<>
			<p style={{ textAlign: 'center', marginTop: 46 }}> Merci de vous connecter ! </p>
			<div className="action" style={{ display: 'block', margin: '0 auto', width: '50%' }}>
				<Button
					circular
					type="submit"
					click={() => {
						if (!user) {
							dispatch(openPhoneAuth(true));
						}
					}}
					text="Activer mon compte"
				/>
			</div>
		</>
	) : // eslint-disable-next-line no-nested-ternary
	!loadingList && currentQuestionnaire.complet && questionnaire ? (
		<Header
			as="h5"
			style={{
				textAlign: 'center',
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%,-50%)',
			}}
		>
			{' '}
			Vous avez deja répondu à ce questionnaire{' '}
		</Header>
	) : // eslint-disable-next-line no-nested-ternary
	loadingUserQuestionnaire ? (
		<Dimmer active>
			<Loader />
		</Dimmer>
	) : (
		<>
			<BackButton text={currentQuestionnaire.data.titre} />
			<Form className="survey-container" onSubmit={handleSubmit}>
				<div className="survey-content">
					<p style={{ marginTop: 44, textAlign: 'center' }}>{currentQuestionnaire.data.description}</p>
					<span style={{ paddingTop: 10 }} className="survey-ratio">
						{currentQuestion + 1}/{questionnaire.Questions.length}
					</span>

					<h2 className="survey-questions-title">{questionnaire.Questions[currentQuestion].question}</h2>

					<div className="survey-questions-container">
						{questionnaire.Questions[currentQuestion].responses.map((response, index) => (
							<CheckField
								title={response.response}
								value={`${response.response}##${index}`}
								key={response.response}
								answer={`${answer}`}
								clicked={(value) => setAnswer(`${value}`)}
							/>
						))}
					</div>
				</div>

				<div className="survey-action">
					<Button
						type="submit"
						text={currentQuestion + 1 === questionnaire.Questions.length ? 'Confirmer' : 'Suivant'}
					/>
				</div>
			</Form>
			<Modal
				open={open}
				setOpen={(value) => {
					dispatch(openCongratulation(value));
					if (!value) {
						history.push('/');
					}
				}}
				className="survey-modal"
			>
				<p>Merci pour votre participation, vous avez gagné </p>
				<button type="button" className="points">
					{questionnaire.points}P
				</button>
				<p>à très bientot </p>
				<Button
					type="button"
					text="Accueil"
					click={() => {
						dispatch(openCongratulation(false));
						history.push('/');
					}}
				/>
			</Modal>
		</>
	);
};

export default Survey;
