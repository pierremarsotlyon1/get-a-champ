/**
 * Created by pierremarsot on 01/02/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import ManagerInt from '../../utils/ManagerInt';

import {
  add_animation_incentive_evenementiel_sportif
} from '../../actions/animations_incentive_evenementiel_sportif';

class AddAnimationIncentiveSportif extends React.Component {
  constructor(props) {
    super(props);
    const id = this.props.params.id;
    if (!id) {
      //Redirection
    }

    this.state = {
      idThematique: id,
      animer_seul: false,
      //montant_minimum: '',
    }
  }

  handleSubmitAnimationIncentiveSportif = () => {

    this.props.dispatch(add_animation_incentive_evenementiel_sportif(
      this.state.idThematique,
      this.state.animer_seul,
      //this.state.montant_minimum,
    ));
  };

  changeAnimerSeulThematique = (event, isInputChecked) => {
    this.setState({
      animer_seul: isInputChecked,
    });
  };

  handleMontantSouhaite = (event, new_montant) => {
    new_montant = ManagerInt.stringToInt(new_montant);
    new_montant = !ManagerInt.isInt(new_montant) ? '' : ManagerInt.intToString(new_montant);

    this.setState({
      montant_minimum: new_montant,
    });
  };

  render() {
    return (
      <div id="add-animation-incentive-sportif">
        <div className="col-md-12">
          <div className="boxed boxed--md boxed--border">
            <h4>Ajouter une animation incentive</h4>
            <div className="panel-body">
              <div className="form-group">
                <Checkbox
                  label="Pouvez-vous l'animer seul ?"
                  onCheck={this.changeAnimerSeulThematique}
                />
              </div>
              <div className="form-group">
                <RaisedButton
                  label="Enregistrer"
                  primary={true}
                  onTouchTap={this.handleSubmitAnimationIncentiveSportif}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(AddAnimationIncentiveSportif);