/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Dimmer, Form, Loader } from 'semantic-ui-react';
import BackButton from 'src/Components/BackButton/BackButton';
import Button from 'src/Components/Button';
import Modal from 'src/Components/Modal';
import { answerQuestionnaire } from 'src/store/survey';
import surveyActions from 'src/store/survey/actions';
import CheckField from './Components/CheckField';
import './Servey.less';

const index = () => {
	// eslint-disable-next-line no-unused-vars
	const history = useHistory();
	const { id } = useParams();
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const dispatch = useDispatch();
	// eslint-disable-next-line no-unused-vars
	const { userQuestionnaire: questionnaire, loadingUserQuestionnaire } = useSelector(
		(state) => state.questionnaires
	);
	const [questions, setQuestions] = useState();
	const [answer, setAnswer] = useState();
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (id && !questionnaire) {
			dispatch({ type: surveyActions.FETCH_USER_QUESTIONNAIRE, payload: id });
		}
		if (questionnaire) {
			setQuestions(JSON.parse(questionnaire.Questions));
		}
	}, [id, questionnaire]);

	const handleSubmit = (e) => {
		if (currentQuestion + 1 === questions.length) {
			e.preventDefault();
			setLoading(true);
			setOpen(true);
		} else {
			dispatch(
				answerQuestionnaire({
					question: questions[currentQuestion].question,
					reponses: [{ reponse: answer }],
				})
			);
			setCurrentQuestion(currentQuestion + 1);
		}
	};

	return loadingUserQuestionnaire ? (
		<Dimmer active>
			<Loader />
		</Dimmer>
	) : (
		<>test</>
	);
};

export default index;
