import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { openPhoneAuth } from 'src/store/app';

import { Dimmer, Form, Loader } from 'semantic-ui-react';
import BackButton from 'src/Components/BackButton/BackButton';
import Button from 'src/Components/Button';
import Modal from 'src/Components/Modal';
import { openCongratulation, setLoadingUserQuestionnaire } from 'src/store/survey';
import surveyActions from 'src/store/survey/actions';
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
		userQuestionnaire: { questionnaires: questionnaire },
	} = useSelector((state) => state.questionnaires);
	const [answer, setAnswer] = useState();
	const open = useSelector((state) => state.questionnaires.openCongratulation);

	const user = useSelector((state) => state.user.currentUser);

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
		if (id && user) {
			dispatch(setLoadingUserQuestionnaire(true));
			dispatch({ type: surveyActions.FETCH_USER_QUESTIONNAIRE, payload: id });
		}
		if (!user) {
			dispatch(openPhoneAuth(true));
		}
	}, [id, user]);

	const handleSubmit = () => {
		if (currentQuestion + 1 === questionnaire.Questions.length) {
			dispatch({
				type: surveyActions.ANSWER_QUESTION,
				payload: {
					idQuestionnaire: id,
					questionResponses: {
						question: questionnaire.Questions[currentQuestion].question,
						reponses: [{ reponse: answer }],
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
						reponses: [{ reponse: answer }],
					},
				},
			});
			setCurrentQuestion(currentQuestion + 1);
		}
	};

	return loadingUserQuestionnaire ? (
		<Dimmer active>
			<Loader />
		</Dimmer>
	) : (
		<>
			<Form className="survey-container" onSubmit={handleSubmit}>
				<div className="survey-header">
					<BackButton text={questionnaire.titre} />
				</div>

				<div className="survey-content">
					<span className="survey-ratio">
						{currentQuestion + 1}/{questionnaire.Questions.length}
					</span>

					<h2 className="survey-questions-title">{questionnaire.Questions[currentQuestion].question}</h2>

					<div className="survey-questions-container">
						{questionnaire.Questions[currentQuestion].responses.map((response) => (
							<CheckField
								title={response.response}
								value={response.response}
								key={response.response}
								answer={answer}
								clicked={setAnswer}
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
				<p>Merci pour votre participation Vous avez gagné </p>
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
