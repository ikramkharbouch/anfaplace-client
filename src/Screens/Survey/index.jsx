import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'semantic-ui-react';
import BackButton from 'src/Components/BackButton/BackButton';
import Button from 'src/Components/Button';
import Modal from 'src/Components/Modal';
import CheckField from './Components/CheckField';
import './Servey.less';

const index = () => {

	const history = useHistory();

	const initialValues = [
		{
			title: 'Quod iam tamen quos',
			value: 1,
		},
		{
			title: 'Quod iam tamen quos',
			value: 2,
		},
		{
			title: 'Quod iam tamen quos',
			value: 3,
		},
	];
	const [serveyQuestions] = useState(initialValues);
	const [answer, setAnswer] = useState(1);
	const [loading, setLoading] = useState(false);

	const [open, setOpen] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setOpen(true);
	};

	useEffect(() => {
		setLoading(open);
	}, [open])



	return (
		<>
			<Form className="survey-container" onSubmit={handleSubmit}>
				<div className="survey-header">
					<BackButton text='Titre Questionnaire ipsum lorem dplogyy ty color rtr ipsum lore …' />
				</div>

				<div className="survey-content">

					<span className="survey-ratio">1/{serveyQuestions.length}</span>

					<h2 className="survey-questions-title">
						CONSETETUR SADIPSCING ELITR SED DIAM NONUMY EIRMOD TEMPOR INVIDUNT UT LABORE ?
				</h2>

					<div className="survey-questions-container">

						{serveyQuestions.map((serveyQuestion) => (
							<CheckField
								title={serveyQuestion.title}
								value={serveyQuestion.value}
								key={serveyQuestion.value}
								answer={answer}
								clicked={setAnswer}
							/>
						))}
					</div>
				</div>

				<div className="survey-action">
					<Button type="submit" loading={loading} />
				</div>
			</Form>
			<Modal open={open} setOpen={setOpen} className='survey-modal'>
				<p>Merci pour votre participation Vous avez gagné </p>
				<button type="button" className="points">+500p</button>
				<p>à très bientot </p>
				<Button type="button" text='Accueil' click={() => history.push('/')} />
			</Modal>
		</>
	);
};

export default index;
