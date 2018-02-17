/**
 * Created by pierremarsot on 29/03/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';

import {
  load_short_questions_ipip,
  load_reponses_ipip,
  saveAnswerShortIpip,
  loadResultatsShortTestSportif,
} from '../../actions/ipip';

class ShortTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reponses_test: [],
      disable_bouton_suivant: true,
      id_reponse_temp: -1,
    };
  }

  componentDidMount() {
    const {
      short_questions,
      reponses,
      resultatsShortTest,
    } = this.props;

    if (!short_questions || short_questions.length === 0) {
      this.props.dispatch(load_short_questions_ipip());
    }

    if (!reponses || reponses.length === 0) {
      this.props.dispatch(load_reponses_ipip());
    }

    if (!resultatsShortTest || resultatsShortTest.length === 0) {
      this.props.dispatch(loadResultatsShortTestSportif());
    }
  }

  handleSubmitReponse = (id_question) => {
    let {
      id_reponse_temp,
      reponses_test,
    } = this.state;

    if (id_question && id_reponse_temp) {
      reponses_test.push({
        id_question: id_question,
        id_reponse: id_reponse_temp,
      });

      this.setState({
        disable_bouton_suivant: true,
        id_reponse_temp: -1,
        reponses_test: reponses_test,
      });
    }
  };

  handleSaveReponse = (event, value) => {
    if (value) {
      this.setState({
        disable_bouton_suivant: false,
        id_reponse_temp: value,
      });
    }
    else {
      this.setState({
        disable_bouton_suivant: true,
        id_reponse_temp: -1,
      });
    }
  };

  handleEndTest = () => {
    this.props.dispatch(saveAnswerShortIpip(this.state.reponses_test));

    this.setState({
      reponses_test: [],
      disable_bouton_suivant: true,
      id_reponse_temp: -1,
    });
  };

  render() {
    const {
      short_questions,
      reponses,
      resultatsShortTest,
    } = this.props;

    const {
      reponses_test,
      disable_bouton_suivant,
      id_reponse_temp,
    } = this.state;

    const reponses_local = [];
    const resultatsTestLocal = [];

    //On génère les réponses
    for (const reponse of reponses) {
      if (!reponse || !reponse._source || !reponse._source.text) {
        continue;
      }

      reponses_local.push(
        <RadioButton
          key={reponse._id}
          value={reponse._id}
          label={reponse._source.text}
        />
      );
    }

    //On récup la question courante
    let question;
    for (const short_question of short_questions) {
      if (!short_question || !short_question._source || !short_question._id) {
        continue;
      }

      //On regarde si on a déjà répondu à la question
      let find = false;
      for (const short_question_already_done of reponses_test) {
        if (!short_question_already_done
          || !short_question_already_done.id_question
          || short_question_already_done.id_question !== short_question._id) {
          continue;
        }

        find = true;
        break;
      }

      //Si find == true, c'est qu'on a déjà répondu
      if (find) {
        continue;
      }

      question = short_question;
      break;
    }

    //On génère l'affichage des résultats
    if (resultatsShortTest && resultatsShortTest.length > 0) {
      let indexSlider = 1;
      for (const resultat of resultatsShortTest) {
        resultatsTestLocal.push(
          <div>
            <h2>{resultat.nom_sous_categorie}</h2>
            <Slider
              key={"indexSlider_resultats_test" + indexSlider}
              disabled={true}
              min={0}
              max={resultat.max_score}
              value={resultat.score}/>
          </div>
        );

        indexSlider++;
      }
    }

    return (
      <div id="short-test-sportif" className="row">
        <div className="col-md-12">
          <div className="boxed boxed--md boxed--border">
            {
              question !== undefined
                ?
                <div>
                  <Slider
                    disabled={true}
                    min={0}
                    max={short_questions.length}
                    value={reponses_test.length}/>
                  <h2>{question._source.text}</h2>
                  <RadioButtonGroup
                    name="shipSpeed"
                    onChange={this.handleSaveReponse}
                    valueSelected={id_reponse_temp}
                  >
                    {reponses_local}
                  </RadioButtonGroup>
                  <RaisedButton
                    label="Suivant"
                    disabled={disable_bouton_suivant}
                    primary={true}
                    onTouchTap={() => this.handleSubmitReponse(question._id)}
                  />
                </div>
                :
                <div>
                  <p>Vous avez terminé le test, veuillez cliquer sur le bouton ci-dessous pour valider vos réponses</p>
                  <RaisedButton
                    label="Envoyer vos réponses"
                    primary={true}
                    onTouchTap={() => this.handleEndTest()}
                  />
                </div>
            }
          </div>
        </div>
        <div className="col-md-12">
          <div className="boxed boxed--md boxed--border">
            <h2>Résultats de votre test</h2>
            {
              resultatsTestLocal.length === 0 ?
                <div>
                  <p>Vous n'avez pas encore réalisé le test</p>
                </div>
                :
                resultatsTestLocal
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {ipip} = state;
  return {
    short_questions: ipip.short_questions,
    reponses: ipip.reponses,
    resultatsShortTest: ipip.resultatsShortTest,
  };
}

export default connect(mapStateToProps)(ShortTest);