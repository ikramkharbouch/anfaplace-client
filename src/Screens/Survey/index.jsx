/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Dimmer, Form, Loader } from 'semantic-ui-react';
import BackButton from 'src/Components/BackButton/BackButton';
import Button from 'src/Components/Button';
import Modal from 'src/Components/Modal';
import questionnaires, { answerQuestionnaire, openCongratulation } from 'src/store/survey';
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
		userQuestionnaire: { questionnaires: questionnaire },
		loadingUserQuestionnaire,
	} = useSelector((state) => state.questionnaires);
	const [questions, setQuestions] = useState();
	const [answer, setAnswer] = useState();
	const [loading, setLoading] = useState(false);
	const open = useSelector((state) => state.questionnaires.openCongratulation);

	const user = useSelector((state) => state.user.currentUser);

	useEffect(() => {
		if (questionnaire) {
			setQuestions(questionnaire.Questions);
			console.log('=========>', questionnaire.Questions);
			let currentQ = 0;
			questionnaire.Questions.forEach((quetion) => {
				if (quetion.status === 'complet') {
					currentQ += 1;
				}
			});
			setCurrentQuestion(currentQ);
		}
		if (id && user && !questionnaire && !questions) {
			dispatch({ type: surveyActions.FETCH_USER_QUESTIONNAIRE, payload: id });
		}
	}, [id, questions, questionnaire, user]);

	const handleSubmit = (e) => {
		if (currentQuestion + 1 === questions.length) {
			dispatch({
				type: surveyActions.ANSWER_QUESTION,
				payload: {
					idQuestionnaire: id,
					questionResponses: {
						question: questions[currentQuestion].question,
						reponses: [{ reponse: answer }],
					},
					isLast: true,
				},
			});
		} else {
			dispatch({
				type: surveyActions.ANSWER_QUESTION,
				payload: {
					idQuestionnaire: id,
					questionResponses: {
						question: questions[currentQuestion].question,
						reponses: [{ reponse: answer }],
					},
				},
			});
			setCurrentQuestion(currentQuestion + 1);
		}
	};
	console.log('-------->', questions);
	return loadingUserQuestionnaire || !questions ? (
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
						{currentQuestion + 1}/{questions.length}
					</span>

					<h2 className="survey-questions-title">{questions[currentQuestion].question}</h2>

					<div className="survey-questions-container">
						{questions[currentQuestion].responses.map((response) => (
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
						loading={loading}
						text={currentQuestion + 1 === questions.length ? 'Confirmer' : 'Suivant'}
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
				<Button type="button" text="Accueil" click={() => history.push('/')} />
			</Modal>
		</>
	);
};

export default Survey;
