/**
 * Created by pierremarsot on 01/02/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ManagerInt from '../../../utils/ManagerInt';


class DemandeSpecifiqueAnimationFormationEntreprise extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="add-animation-formation-sportif">
        <div className="col-md-12">
          <div className=" boxed boxed--lg boxed--border">
            <div className="panel panel-bordered">
              <h4>Demande d'animation de formation spécifique</h4>
              <div className="panel-body">
                <div className="form-group col-md-12">
                  <label>Votre demande :</label>
                  <textarea name="message" placeholder="Message" class="validate-required" rows="4"></textarea>
                </div>
                <div className="col-sm-12 text-center">
                  <button type="submit" className="btn btn--primary">Envoyer votre demande</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(DemandeSpecifiqueAnimationFormationEntreprise);