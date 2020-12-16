import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import BackButton from '../../Components/BackButton';
import Button from '../../Components/Button';
import CheckField from './Components/CheckField';
import './Servey.less';

const index = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <Form className="survey-container" onSubmit={handleSubmit}>
      {console.log(answer)}
      <div className="survey-header">
        <BackButton text="Questionnaire" />
        <span className="survey-ratio">1/{serveyQuestions.length}</span>
      </div>

      <div className="survey-content">
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
  );
};

export default index;
