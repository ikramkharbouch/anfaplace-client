import React from 'react';
import { Header } from 'semantic-ui-react';
import Slider from '../../../../Components/Slider';
import QuestionnaireSlide from './QuestionnaireSlide';
import './Questionnaire.less';

const Questionnaire = () => (
  <div className="questionnaire">
    <Header as="h3">
      Questionnaires
      <Header.Subheader>Lorem ipsum dolor sit amet, consetetur sadipscing</Header.Subheader>
    </Header>
    <Slider autoplay={false} pagination={false} slidersPerView={1.35}>
      <QuestionnaireSlide />
      <QuestionnaireSlide />
      <QuestionnaireSlide />
    </Slider>
  </div>
);

export default Questionnaire;
