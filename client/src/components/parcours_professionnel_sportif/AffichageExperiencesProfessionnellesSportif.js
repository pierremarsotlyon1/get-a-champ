/**
 * Created by pierremarsot on 20/01/2017.
 */
import React from 'react';
import Card from 'material-ui/Card/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import CardText from 'material-ui/Card/CardText';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import Link from 'react-router/lib/Link';
import ExperienceProfessionnelleSportif from './ExperienceProfessionnelleSportif';

import {
  load_parcours_professionnel_sportif,
  remove_experience_professionnelle_sportif,
  set_experience_professionnelle_to_update,
} from '../../actions/experience_professionnelle_sportif';

import {
  frenchDate
} from '../../utils/DatePicker';

class AffichageExperiencesProfessionnellesSportif extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_update_experience_professionnelle_sportif: undefined,
    };
  }

  componentDidMount() {
    const {
      experiences_professionnelles_sportif
    } = this.props;

    if (!experiences_professionnelles_sportif || experiences_professionnelles_sportif.length === 0) {
      this.props.dispatch(load_parcours_professionnel_sportif());
    }
  }

  removeExperienceProfessionnelleSportif = (id_experience_professionnelle_sportif) => {
    this.props.dispatch(remove_experience_professionnelle_sportif(id_experience_professionnelle_sportif));
  };

  updateExperienceProfessionnelleSportif = (experience_professionnelle_sportif) => {
    this.props.dispatch(set_experience_professionnelle_to_update(experience_professionnelle_sportif));
  };

  render() {
    const {
      experiences_professionnelles_sportif,
      canDelete,
      canUpdated,
    } = this.props;

    return (
      <div className="affichage-experience-pro-sportif">
        <div className="boxed boxed--md boxed--border">
          <div className="row">
            <div className="col-sm-7">
              <h4>Vos experiences professionnelles</h4>
            </div>
            <div className="col-sm-5">
              <Link to="/profil/sportif/parcours_professionnel/add"
                    className="btn btn--primary type--uppercase pull-right">
              <span className="btn__text">
                            Ajouter une experience pro
                          </span>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {
                (!experiences_professionnelles_sportif || experiences_professionnelles_sportif.length === 0)
                  ?
                  <div className="alert alert-info">
                    Vous n'avez pas renseigné d'experience professionnelle
                  </div>
                  :
                  experiences_professionnelles_sportif.map((experience_pro_sportif) => {
                    return <ExperienceProfessionnelleSportif
                      canUpdate={false}
                      canDelete={true}
                      experience_professionnelle_sportif={experience_pro_sportif}
                    />
                  })
              }
            </div>
          </div>
        </div>
      </div>
    )
  };
}

function mapStateToProps(state) {
  const {experience_professionnelle_sportif} = state;
  if (experience_professionnelle_sportif) {
    return {
      experiences_professionnelles_sportif: experience_professionnelle_sportif.experiences_professionnelles_sportif,
    };
  }


  return {
    experiences_professionnelles_sportif: [],
  };
}

export default connect(mapStateToProps)(AffichageExperiencesProfessionnellesSportif);