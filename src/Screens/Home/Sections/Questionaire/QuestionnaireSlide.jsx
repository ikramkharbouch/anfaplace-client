import React from 'react';
import PropTypes from 'prop-types';
import './QuestionnaireSlide.less';
import { Button, Label } from 'semantic-ui-react';
import { ReactComponent as GiftIcon } from '../../../../assets/icons/gift.svg';
import questionnaire from '../../../../assets/images/temp/questionaire-bg.jpg';
import { ReactComponent as ArrowIcon } from '../../../../assets/icons/arrow.svg';

const QuestionnaireSlide = ({ points, brands, description }) => (
  <div className="questionnaire-slide">
    <img src={questionnaire} alt="questionnaire" />
    <div className="details">
      <Label className="point">
        <GiftIcon />
        {points}p
      </Label>
      <div className="tags">
        {brands.map((brand) => (
          <Label>{brand}</Label>
        ))}
      </div>
      <p className="description">{description}</p>
      <Button>
        Commencer <ArrowIcon />
      </Button>
    </div>
  </div>
);

QuestionnaireSlide.propTypes = {
  points: PropTypes.number,
  brands: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
};

QuestionnaireSlide.defaultProps = {
  points: 100,
  brands: ['Mcdo'],
  description: 'Titre de QUESTIONNAIRE sur 2 lignes et coupe la ligne ici blalalalalallala',
};

export default QuestionnaireSlide;
