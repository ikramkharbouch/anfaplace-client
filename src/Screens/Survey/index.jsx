import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { useParams, useHistory } from 'react-router-dom';
import { Form } from 'semantic-ui-react';
import BackButton from 'src/Components/BackButton/BackButton';
import Button from 'src/Components/Button';
import Modal from 'src/Components/Modal';
import CheckField from './Components/CheckField';
import './Servey.less';

const questionnaireSelector = createSelector(
	(state) => state.questionnaires.list,
	(_, index) => index,
	(questionnaires, index) =>
		questionnaires.find((questionnaire) => questionnaire.index === index).data
);

const index = () => {
	// eslint-disable-next-line no-unused-vars
	const history = useHistory();
	const { id } = useParams();
	const [currentQuestion, setCurrentQuestion] = useState(0);

	// eslint-disable-next-line no-unused-vars
	const questionnaire = useSelector((state) => questionnaireSelector(state, id));
	const questions = JSON.parse(questionnaire.Questions);
	const [answer, setAnswer] = useState(1);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setLoading(open);
	}, [open]);

	const handleSubmit = (e) => {
		if (currentQuestion + 1 === questions.length) {
			e.preventDefault();
			setLoading(true);
			setOpen(true);
		} else {
			setCurrentQuestion(currentQuestion + 1);
		}
	};

	return (
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
			<Modal open={open} setOpen={setOpen} className="survey-modal">
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

export default index;
