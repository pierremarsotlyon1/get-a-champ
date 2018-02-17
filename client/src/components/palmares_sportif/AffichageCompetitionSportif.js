/**
 * Created by pierremarsot on 21/01/2017.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CompetitionSportif from './CompetitionSportif';
import ModalCompetition from '../competition/ModalCompetition';

import {
  load_competition_sportif
} from '../../actions/competition_sportif';

import {
  search_sport,
  load_niveaux_competition
} from '../../actions/profil_sportif';

import {
  update_competition_sportif,
  add_competition_sportif,
  close_modal_update_competition,
  open_modal_update_competition,
} from '../../actions/competition_sportif';

import {
  add_experience,
  close_modal_update_experience,
  open_modal_update_experience,
  update_experience,
} from '../../actions/experience_sportif';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-selectize/themes/index.css';

class AffichageCompetitionSportif extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      competitions_sportif
    } = this.props;

    if (!competitions_sportif || competitions_sportif.length === 0) {
      this.props.dispatch(load_competition_sportif());
    }
  }

  render() {
    const {
      competitions_sportif,
    } = this.props;

    return (
      <section id="affichage_competition">
        {
          competitions_sportif.length === 0 ?
            <div className="alert alert-info">
              Vous n'avez pas encore renseigné de compétitions
            </div>
            :
            <ul className="timeline timeline-icon">
              <li className="timeline-period">Mon palmarès</li>
              {
                competitions_sportif.map((competition, index) => {
                  return <CompetitionSportif
                    key={competition._id}
                    competition={competition}
                    right={index%2}
                  />
                })
              }
            </ul>
        }
      </section>
    )
  }
}

AffichageCompetitionSportif.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const {competition_sportif} = state;
  if (competition_sportif) {
    return {
      competitions_sportif: competition_sportif.competitions_sportif
    };
  }

  return {
    competitions_sportif: [],
  };
}

export default connect(mapStateToProps)(AffichageCompetitionSportif);