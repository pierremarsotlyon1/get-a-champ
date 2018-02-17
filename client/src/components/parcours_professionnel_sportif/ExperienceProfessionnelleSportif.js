/**
 * Created by pierremarsot on 20/01/2017.
 */
import React, {PropTypes} from 'react';
import Card from 'material-ui/Card/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import CardText from 'material-ui/Card/CardText';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import Link from 'react-router/lib/Link';

import {
  remove_experience_professionnelle_sportif,
  set_experience_professionnelle_to_update,
} from '../../actions/experience_professionnelle_sportif';

import {
  frenchDate
} from '../../utils/DatePicker';

class ExperienceProfessionnelleSportif extends React.Component {
  constructor(props) {
    super(props);
  }

  removeExperienceProfessionnelleSportif = (id_experience_professionnelle_sportif) => {
    this.props.dispatch(remove_experience_professionnelle_sportif(id_experience_professionnelle_sportif));
  };

  updateExperienceProfessionnelleSportif = (experience_professionnelle_sportif) => {
    this.props.dispatch(set_experience_professionnelle_to_update(experience_professionnelle_sportif));
  };

  render() {
    const {
      experience_professionnelle_sportif,
      canDelete,
      canUpdate,
    } = this.props;

    return (
      <div className="add-experience-pro-sportif">
        <div className="col-sm-4" key={experience_professionnelle_sportif._id}>
          <div className="feature feature-1 boxed boxed--border">
            <h5>{experience_professionnelle_sportif._source.metier_experience_professionnelle_sportif.libelle_metier}</h5>
            <p>
              <div>
                Chez {experience_professionnelle_sportif._source.nom_entreprise_experience_professionnelle_sportif}
                <div>
                  du {frenchDate(experience_professionnelle_sportif._source.date_debut_experience_professionnelle_sportif)}
                  au {frenchDate(experience_professionnelle_sportif._source.date_fin_experience_professionnelle_sportif)}
                </div>
              </div>
            </p>
            <p>
              {experience_professionnelle_sportif._source.description_poste_experience_professionnelle_sportif}
            </p>
            {
              canUpdate ?
                <div className="margin-top-15">
                  <RaisedButton
                    className="m-l-md m-b-md m-r-md"
                    label="Modifier"
                    primary={true}
                    onClick={() => this.updateExperienceProfessionnelleSportif(experience_professionnelle_sportif)}
                  />
                </div>
                : undefined
            }
            {
              canDelete ?
                <div className="margin-top-15">
                  <RaisedButton
                    className="m-l-md m-b-md m-r-md"
                    label="Supprimer"
                    secondary={true}
                    onClick={() => this.removeExperienceProfessionnelleSportif(experience_professionnelle_sportif._id)}
                  />
                </div>
                : undefined
            }
            <div className="clearfix"></div>
          </div>
        </div>
      </div>
    )
  };
}

ExperienceProfessionnelleSportif.propTypes = {
  canUpdate: PropTypes.bool.isRequired,
  canDelete: PropTypes.bool.isRequired,
  experience_professionnelle_sportif: PropTypes.object.isRequired,
};

export default connect()(ExperienceProfessionnelleSportif);