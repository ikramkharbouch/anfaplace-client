import React, { useEffect, useState, useCallback } from 'react';
import { Header } from 'semantic-ui-react';
import { fetchDataFromAPI, arrayBufferToBase64 } from 'src/utils/utilsFunctions';

import Slider from 'src/Components/Slider';
import QuestionnaireSlide from './QuestionnaireSlide';
import './Questionnaire.less';

const Questionnaire = React.forwardRef((props, ref) => {

	const [questions, setQuestions] = useState([]);
	// const [ loading , setLoading ] = useState(false);
	// const [ error , setError ] = useState(''); 

	const getAllQuestions = useCallback(async () => {
		try {
			const response = await fetchDataFromAPI({ url: 'getListQuestionnaire' });
			const { data } = response;
			console.log(data)
			if (data.success) {
				setQuestions(data.lists.map(x => ({
					id: x.index,
					...x.data
				})));
			} else {
				throw new Error('Something went wrong')
			}
			console.log(response)
		} catch (error) {
			alert(error.message);
		}

	})

	useEffect(() => {
		getAllQuestions();
	}, []);


	return (
		<div className="questionnaire" ref={ref}>
			<Header as="h3">
				Questionnaires
				<Header.Subheader> Répondez au questionnaire et gagnez des points </Header.Subheader>
			</Header>
			<Slider
				id="questionnaire"
				slidesOffsetBefore={20}
				autoplay={false}
				pagination={false}
				slidersPerView={1.42}
			>
				{
					questions.map(({ id, points, description, marque, visuel }) => <QuestionnaireSlide
						key={id}
						points={points}
						description={description}
						brands={[marque]}
						image={arrayBufferToBase64(visuel.data) === 'data:image/jpeg;base64,' ? visuel : arrayBufferToBase64(visuel.data)}
					/>)
				}


			</Slider>
		</div>
	)
});

export default Questionnaire;
