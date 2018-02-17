/**
 * Created by pierremarsot on 01/02/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ManagerInt from '../../utils/ManagerInt';

import {
  add_animation_conference_sportif
} from '../../actions/animations_conference_sportif';

class AddAnimationConferenceSportif extends React.Component {
  constructor(props) {
    super(props);
    const id = this.props.params.id;
    if (!id) {
      //Redirection
    }

    this.state = {
      idThematique: id,
      montant_minimum: '',
    }
  }

  handleSubmitModalAddAnimationConferenceSportif = () => {

    this.props.dispatch(add_animation_conference_sportif(
      this.state.idThematique,
      this.state.montant_minimum,
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
      <div id="add-animation-conference-sportif">
        <div className="col-md-12">
          <div className="boxed boxed--md boxed--border">
            <h4>Ajouter une animation de conférence</h4>
            <div className="panel-body">
              <div className="form-group">
                <TextField
                  hintText="Montant minimum souhaité"
                  floatingLabelText="Montant minimum souhaité (euros)"
                  onChange={this.handleMontantSouhaite}
                  value={this.state.montant_minimum}
                />
              </div>
              <div className="form-group">
                <RaisedButton
                  label="Enregistrer"
                  primary={true}
                  onTouchTap={this.handleSubmitModalAddAnimationConferenceSportif}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(AddAnimationConferenceSportif);