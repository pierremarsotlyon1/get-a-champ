/**
 * Created by pierremarsot on 01/02/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class DemandeSpecifiqueAnimationFormationSportif extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id="add-animation-formation-sportif">
        <div className="col-md-12">
          <div className="panel panel-bordered">
            <div className="panel-heading">
              <h3 className="panel-title">Demande d'animation de formation spécifique</h3>
            </div>
            <div className="panel-body">
              <div className="form-group col-md-12">
                <TextField
                  floatingLabelText="Précisez nous votre recherche"
                  multiLine={true}
                  fullWidth={true}
                  rows={5}
                />
              </div>
              <div className="form-group text-center">
                <RaisedButton label="Envoyer votre demande" primary={true} />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default connect()(DemandeSpecifiqueAnimationFormationSportif);