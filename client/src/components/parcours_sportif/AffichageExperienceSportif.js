/**
 * Created by pierremarsot on 21/01/2017.
 */
import React, {Component, PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';

import {
  remove_experience_sportif,
} from '../../actions/experience_sportif';

import {
  load_experiences_sportif
} from '../../actions/experience_sportif';
import {
  frenchDate
} from '../../utils/DatePicker';

class AffichageExperienceSportif extends Component {
  componentDidMount() {
    const {
      experiences_sportif
    } = this.props;

    if (!experiences_sportif || experiences_sportif.length === 0) {
      this.props.dispatch(load_experiences_sportif());
    }
  }

  removeExperience = (index_experience_sportif) => {
    this.props.dispatch(remove_experience_sportif(index_experience_sportif));
  };

  render() {
    const {
      experiences_sportif
    } = this.props;
    return (
      <span id="affichage_experience_sportive">
        {
          experiences_sportif.length === 0 ?
            <div className="alert alert-info">
              Vous n'avez pas encore renseigné d'experiences sportives
            </div>
            :
            <div className="row">
              <div className="col-sm-10 col-sm-offset-1 margin-top-15">
                <div className="process-1">
                  {
                    experiences_sportif.map((experience, index) => {
                      const description_experience = experience._source.description_experience_sportif ?
                        <p>
                          Description : {experience._source.description_experience_sportif}
                        </p> : undefined;

                      return <div className="process__item" key={experience._id}>
                        <h4>{experience._source.sport_experience_sportif.nom_sport}
                          <br/> {experience._source.lieu_experience_sportif.nom}
                          — {frenchDate(experience._source.date_debut_experience_sportif)}
                          au {frenchDate(experience._source.date_fin_experience_sportif)}</h4>
                        <p>
                          Nom du club : {experience._source.nom_club_experience_sportif}
                          <br/>
                          {description_experience}
                        </p>
                        <div className="widget-body-footer">
                          <div className="widget-actions">
                            <RaisedButton
                              label="Modifier"
                              onTouchTap={() => this.props.onUpdate(experience._id)}
                            />
                            <RaisedButton
                              label="Supprimer"
                              secondary={true}
                              onTouchTap={() => this.removeExperience(experience._id)}
                            />
                          </div>
                        </div>
                      </div>
                    })
                  }
                </div>
              </div>
            </div>
        }
      </span>
    )
  }
}

AffichageExperienceSportif.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  experiences_sportif: PropTypes.array,
};

function mapStateToProps(state) {
  const {experience_sportif} = state;
  if (experience_sportif) {
    return {
      experiences_sportif: experience_sportif.experiences_sportif
    };
  }


  return {
    experiences_sportif: [],
  };
}

export default connect(mapStateToProps)(AffichageExperienceSportif);