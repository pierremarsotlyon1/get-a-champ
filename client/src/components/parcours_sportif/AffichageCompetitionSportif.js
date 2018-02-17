/**
 * Created by pierremarsot on 21/01/2017.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CompetitionSportif from './CompetitionSportif';

import {
  load_competition_sportif
} from '../../actions/competition_sportif';

class AffichageCompetitionSportif extends Component {
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
      competitions_sportif
    } = this.props;

    return (
      <section id="affichage_competition">
        {
          competitions_sportif.length === 0 ?
            <div className="alert alert-info">
              Vous n'avez pas encore renseigné de compétitions
            </div>
            :
            <div className="row">
              <div className="col-sm-10 col-sm-offset-1 margin-top-15">
                <div className="process-1">
                  {
                    competitions_sportif.map((competition, index) => {
                      const right = !!(index % 2);
                      return <CompetitionSportif
                        key={competition._id}
                        onUpdate={this.props.onUpdate}
                        competition={competition}
                        right={right}
                      />
                    })
                  }
                </div>
              </div>
            </div>
        }
      </section>
    )
  }
}

AffichageCompetitionSportif.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
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